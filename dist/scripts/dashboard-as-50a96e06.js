// app.js
angular.element(document.getElementsByTagName("head")).append(angular.element('<base href="'+window.location.pathname+'" />')),angular.module("app",["ngRoute","ngDialog"]).config(["$routeProvider","$locationProvider",function(e,n){e.when("/",{templateUrl:"app/deck-root.html",controller:"WindowController"}),n.html5Mode(!0)}]),angular.module("app").constant("config",{baseUrl:-1!=window.location.hostname.indexOf("localhost")?"https://local-eam.leanix.net/demo":"",lifecycleParams:{lifecycle_data:"current",lifecycle:"any",lifecycle_op:"OR"},workspace:null,user:null}),angular.module("app").factory("ApiService",["$http","$routeParams","config",function(e,n,r){var t=function(t,a){var o="";a&&(o="?"+$.param(r.lifecycleParams)+"&"+$.param(a));var i=t+o,s=r.baseUrl+"/api/v1/"+i,c=e.get(s,{headers:{Authorization:"Bearer "+n.token}}).success(function(e){return e}).error(function(){throw"There was an error getting the response from the server."});return c};return{api:t}}]),angular.module("app").config(["ngDialogProvider",function(e){e.setDefaults({className:"ngdialog-theme-default",showClose:!0,closeByDocument:!0,closeByEscape:!0})}]),angular.module("app").controller("WindowController",["$scope","$routeParams","ApiService","ngDialog","config",function(e,n,r,t,a){"token"in n&&$("body").addClass("isViewedExternally"),e.baseUrl=n.baseUrl,""===a.baseUrl&&(a.baseUrl=n.baseUrl),null===a.workspace&&r.api("config").then(function(e){a.workspace=e.data.workspace})}]),angular.module("app").directive("providers",function(){var e=function(e){var n={},r="",t="",a=0;for(n.count=e.length,i=0;i<e.length;++i)if(e[i].resourceHasProviders){var o=e[i].resourceHasProviders.length;o>a&&(a=o,r=e[i].ID,t=e[i].displayName)}return n.maxResources=a,n.providerIDMaxResource=r,n.providerNameMaxResource=t,n},n=function(e){var n=e.getFullYear(),r="0"+(e.getMonth()+1);r=r.slice(-2,r.length-2+3);var t="0"+e.getDate();return t=t.slice(-2,t.length-2+3),t+"."+r+"."+n};return{restrict:"E",templateUrl:"app/infobox.html",replace:!0,scope:{},controller:["$scope","$element","$attrs","$routeParams","ApiService","config",function(r,t,a,o,i,s){r.imgName="providers.png",r.name="Provider",r.baseUrl=o.baseUrl;var c=new Object({relations:!0});i.api("providers",c).then(function(n){var t=e(n.data);return r.keyFigure1=t.count,r.keyFigure2="-3 %",r.nameKeyFigure1="Anzahl der Provider",r.nameKeyFigure2="Vergleich zum Vormonat (der gleiche Stichtag)",r.maxResourcesLabel="Provider mit den meisten Komponenten",r.maxResources=t.maxResources,r.providerIDMaxResource=t.providerIDMaxResource,r.providerNameMaxResource=t.providerNameMaxResource,null!=s.workspace&&(r.color=s.workspace.objectTypes.providers.color),n}),r.date=n(new Date)}]}}),angular.module("app").directive("interfaces",function(){var e=function(e){var n={},r=0,t=0,a="",o="",s=[];for(i=0;i<e.length;++i)if(e[i].serviceHasInterfaces){var c=e[i].serviceHasInterfaces.length;r+=c,s.push(e[i].ID),c>t&&(t=c,a=e[i].ID,o=e[i].displayName)}return n.averageCount=Math.round(r/e.length),n.maxInterfaces=t,n.maxInterfacesAppID=a,n.maxInterfacesAppName=o,n.Ids=s,n},n=function(e){var n=e.getFullYear(),r="0"+(e.getMonth()+1);r=r.slice(-2,r.length-2+3);var t="0"+e.getDate();return t=t.slice(-2,t.length-2+3),t+"."+r+"."+n};return{restrict:"E",templateUrl:"app/infobox.html",replace:!0,scope:{},controller:["$scope","$element","$attrs","ApiService","$routeParams","config",function(r,t,a,o,i,s){r.imgName="interfaces.png",r.name="Schnittstellen";var c=new Object({relations:!0});o.api("services",c).then(function(n){var t=e(n.data);return r.keyFigure1=t.averageCount,r.keyFigure2=t.maxInterfaces,r.nameKeyFigure1="⌀ Anzahl der Schnittstellen pro Applikation",r.nameKeyFigure2="Max Anzahl der Schnittstellen pro Applikation",r.maxInterfacesAppID=t.maxInterfacesAppID,r.maxInterfacesAppName=t.maxInterfacesAppName,r.baseUrl=i.baseUrl,null!=s.workspace&&(r.color=s.workspace.objectTypes.services.color),n}),r.date=n(new Date)}]}}),angular.module("app").directive("components",function(){var e=function(e,n){this.amount=e,this.name=n},n=function(e){var n={},r=0,t=0;for(i=0;i<e.length;++i){var a=e[i].resourceHasResourceCapabilities;e[i].factSheetHasLifecycles&&0===e[i].factSheetHasLifecycles.length&&++r;var a=e[i].resourceHasResourceCapabilities;a&&0!==a.length&&a[0].supportTypeID>0&&++t}return n.count=e.length,n.noLifecycle=r,n.noSupport=e.length-t,n},r=function(e){var n={},r=e.data;for(element in r)if(r[element].serviceHasResources&&r[element].serviceHasResources.length>0){var t=r[element].serviceHasResources;for(serviceElement in t){var a=t[serviceElement].resourceID;n[a]="undefined"==typeof n[a]?1:n[a]+1}}return n},t=function(e){var n=0,r=0;for(resource in e)e[resource]>n&&(n=e[resource],r=resource);return new Object({resourceID:r,occurences:n})},a=function(e){var n=e.getFullYear(),r="0"+(e.getMonth()+1);r=r.slice(-2,r.length-2+3);var t="0"+e.getDate();return t=t.slice(-2,t.length-2+3),t+"."+r+"."+n};return{restrict:"E",templateUrl:"app/infobox.html",replace:!0,scope:{},controller:["$scope","$element","$attrs","ApiService","$routeParams","config",function(o,i,s,c,l,u){o.imgName="comp.png",o.name="Komponenten",c.api("resources",{lifecycle:"any",relations:!0}).then(function(r){o.quality=[];var t=n(r.data);return o.quality.push(new e(t.noLifecycle,"Anzahl der IT Komponenten ohne Lifecycle")),o.quality.push(new e(t.noSupport,"Anzahl der IT Komponenten ohne Support")),o.keyFigure1=t.count,o.nameKeyFigure1="Anzahl der IT Komponenten",o.nameKeyFigure2="Erstellte Komponenten seit Vormonat (der gleiche Stichtag)",o.date=a(new Date),o.baseUrl=l.baseUrl,null!=u.workspace&&(o.color=u.workspace.objectTypes.resources.color),r});var p=new Date;p.setMonth(p.getMonth()-1);var m=new Object({startDate:p.toString(),factSheetType:"resources",eventType:"OBJECT_CREATE",countOnly:"1"});c.api("activities",m).then(function(e){o.keyFigure2=e.data.count});var h=new Object({relations:!0});c.api("services",h).then(function(e){mostUsedComponent=t(r(e)),o.mostUsedResourceID=mostUsedComponent.resourceID,o.mostUsedComponentOccurences=mostUsedComponent.occurences,c.api("resources/"+o.mostUsedResourceID).then(function(e){o.mostUsedResourceName=e.data.displayName})})}]}}),angular.module("app").directive("applications",function(){var e=function(e,n){this.amount=e,this.name=n},n=function(e){var n={},r=0,t=0,a=0,o=0;for(i=0;i<e.length;++i)if(e[i].serviceHasInterfaces&&0===e[i].serviceHasInterfaces.length&&++r,e[i].factSheetHasDocuments&&0===e[i].factSheetHasDocuments.length&&++t,e[i].serviceHasResources&&0===e[i].serviceHasResources.length&&++a,e[i].userSubscriptions&&e[i].userSubscriptions.length){for(var s=!0,c=0;c<e[i].userSubscriptions.length;c++)"2"==e[i].userSubscriptions[c].subscriptionTypeID&&(s=!1);s&&++o}return n.count=e.length,n.noInterfaces=r,n.noDocuments=t,n.noResources=a,n.noResponsibles=o,n},r=function(e){var n=e.getFullYear(),r="0"+(e.getMonth()+1);r=r.slice(-2,r.length-2+3);var t="0"+e.getDate();return t=t.slice(-2,t.length-2+3),t+"."+r+"."+n};return{restrict:"E",templateUrl:"app/infobox.html",replace:!0,scope:{},controller:["$scope","$element","$attrs","ApiService","$routeParams","config",function(t,a,o,i,s,c){var l=new Object({relations:!0});i.api("services",l).then(function(r){t.quality=[];var a=n(r.data);t.keyFigure1=a.count,t.quality.push(new e(a.noResponsibles,"Anzahl der Applikationen ohne Verantwortlichkeiten")),t.quality.push(new e(a.noInterfaces,"Anzahl der Applikationen ohne Schnittstellen")),t.quality.push(new e(a.noDocuments,"Anzahl der Applikationen ohne Dokumente")),t.quality.push(new e(a.noResources,"Anzahl der Applikationen ohne IT Komponenten")),null!=c.workspace&&(t.color=c.workspace.objectTypes.services.color)});var u=new Date;u.setMonth(u.getMonth()-1);var p=new Object({startDate:u.toString(),factSheetType:"services",eventType:"OBJECT_CREATE",countOnly:"1"});i.api("activities",p).then(function(e){t.keyFigure2=e.data.count}),t.imgName="app.png",t.name="Applikationen",t.nameKeyFigure1="Anzahl der Applikationen",t.nameKeyFigure2="Erstellte Anwendungen seit Vormonat (der gleiche Stichtag)",t.date=r(new Date),t.baseUrl=s.baseUrl}]}});