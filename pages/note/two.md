---
layout: doc
navbar: true
sidebar: false
prev: false
next: false
title: note
noteTime: 2025/06/07
noteTitle: 微信小程序开发入坑
noteSummary: 这是我在开发微信小程序中遇到的坑，再此记录以防再次踩坑
---

<!--@include: ../../.vitepress/parts/note-child.md-->

# 微信小程序开发入坑

## 一些问题

- onShareAppMessage 微信分享，限时`3s`，如果异步未转为 fulfilled/rejected 状态，也会走默认分享。
- onShareAppMessage 可以通过 `promise字段` 中 `reject(false)` 阻止分享

## map组件

### 地图坐标/屏幕坐标的转换

> mapContext的实例方法 `toScreenLocation`、`fromScreenLocation` 兼容问题，PC/开发工具不可用❌

手写转换代码

地图坐标转屏幕坐标 - 以map组件中心作为原点
```javascript

/**
 * 地图坐标转屏幕坐标工具方法
 * @param {MapLocation} location - 待转换点的经纬度
 * @param {MapLocation} center - 地图中心区间
 * @param {number} zoom 地图缩放
 * @param {MapRect} mapSize 地图尺寸
 * @returns {ScreenLocation} 转换后的屏幕坐标 { x, y }
 */
export function transformLnglat2Screen(
    location: MapLocation,
    center: MapLocation,
    zoom: number,
    mapSize: MapRect
): ScreenLocation {
    const lng = location.longitude;
    const lat = location.latitude;
    const centerX = center.longitude;
    const centerY = center.latitude;
    // 地球半径（米）
    const EARTH_RADIUS = MAP_RADIUS;

    // 计算地图中心点的墨卡托投影坐标
    const centerMercatorX = lngToMercatorX(centerX);
    const centerMercatorY = latToMercatorY(centerY);

    // 计算待转换点的墨卡托投影坐标
    const mercatorX = lngToMercatorX(lng);
    const mercatorY = latToMercatorY(lat);

    // 计算每像素代表的地理距离（米/像素）
    const scale = Math.pow(2, zoom);
    const metersPerPixel = (2 * Math.PI * EARTH_RADIUS) / 256 / scale;

    // 计算屏幕坐标（以屏幕中心为原点）
    const screenX =
        mapSize.width / 2 + (mercatorX - centerMercatorX) / metersPerPixel;
    const screenY =
        mapSize.height / 2 + (centerMercatorY - mercatorY) / metersPerPixel;

    console.log(
        lng,
        lat,
        ">>>标记的屏幕坐标：",
        screenX,
        screenY,
        screenX + mapSize.left,
        screenY + mapSize.top
    );

    return { x: screenX + mapSize.left, y: screenY + mapSize.top };
}

/**
 * 经度转墨卡托X坐标
 * @param {number} lng - 经度
 * @returns {number} 墨卡托X坐标
 */
export function lngToMercatorX(lng: number): number {
    return lng * ((Math.PI * MAP_RADIUS) / 180);
}

/**
 * 纬度转墨卡托Y坐标
 * @param {number} lat - 纬度
 * @returns {number} 墨卡托Y坐标
 */
export function latToMercatorY(lat: number): number {
    const y = Math.log(Math.tan(Math.PI / 4 + (lat * (Math.PI / 180)) / 2));
    return y * MAP_RADIUS;
}
```

屏幕坐标转地理坐标 - 以地图中心作为原点
```javascript

/**
 * 屏幕坐标转地图坐标工具方法
 * @param {ScreenLocation} location - 待转换点的屏幕坐标
 * @param {MapLocation} center - 地图中心区间
 * @param {number} zoom 地图缩放
 * @param {MapRect} mapSize 地图尺寸
 * @returns {MapLocation} 转换后的地图坐标 { lng, lat }
 */
export function transformScreen2Lnglat(
    location: ScreenLocation,
    center: MapLocation,
    zoom: number,
    mapSize: MapRect
): MapLocation {
    const screenX = location.x - mapSize.left;
    const screenY = location.y - mapSize.top;
    const centerX = center.longitude;
    const centerY = center.latitude;
    // 地球半径（米）
    const EARTH_RADIUS = MAP_RADIUS;

    // 计算地图中心点的墨卡托投影坐标
    const centerMercatorX = lngToMercatorX(centerX);
    const centerMercatorY = latToMercatorY(centerY);

    // 计算每像素代表的地理距离（米/像素）
    const scale = Math.pow(2, zoom);
    const metersPerPixel = (2 * Math.PI * EARTH_RADIUS) / 256 / scale;

    // 根据屏幕坐标计算目标墨卡托坐标（以屏幕中心为原点）
    const mercatorX =
        centerMercatorX + (screenX - mapSize.width / 2) * metersPerPixel;
    const mercatorY =
        centerMercatorY - (screenY - mapSize.height / 2) * metersPerPixel;

    // 墨卡托坐标转经纬度
    const lng = mercatorXToLng(mercatorX);
    const lat = mercatorYToLat(mercatorY);

    console.log(screenX, screenY, ">>>标记的地图坐标：", lng, lat);
    return { longitude: lng, latitude: lat };
}

/**
 * 墨卡托X坐标转经度
 * @param {number} mercatorX - 墨卡托X坐标
 * @returns {number} 经度（度）
 */
export function mercatorXToLng(mercatorX: number): number {
    return (mercatorX * 180) / (Math.PI * 6378137);
}

/**
 * 墨卡托Y坐标转纬度
 * @param {number} mercatorY - 墨卡托Y坐标
 * @returns {number} 纬度（度）
 */
export function mercatorYToLat(mercatorY: number): number {
    const y = mercatorY / 6378137;
    const lat = ((2 * Math.atan(Math.exp(y)) - Math.PI / 2) * 180) / Math.PI;
    return lat;
}ß
```

类型
```typescript
export interface MapLocation {
    longitude: number;
    latitude: number;
}

export interface MapRect {
    width: number;
    height: number;
    left?: number;
    top?: number;
    right?: number;
    bottom?: number;
}

export interface ScreenLocation {
    x: number;
    y: number;
}

export const MAP_RADIUS = 6378137;
```