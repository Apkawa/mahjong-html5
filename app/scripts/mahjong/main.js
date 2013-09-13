/**
 * Author: apkawa
 * Date: 9/13/13
 */

define(['./core/app', './core/entity', 'mootools'], function (app, entity) {
    var apps = {};
    apps = Object.append(apps, app)
    apps = Object.append(apps, entity);
    return apps;
});