/*
# !name = jm去广告
# !desc = jm no ad , supports app and web ,超级净化,支持App和网页版
# !author = theload9638
# 配合使用 https://raw.githubusercontent.com/theload9638/myScripts/main/filters/block.list 

************************************

[rewrite_local]
  # 入口/章节
^https?:\/\/www\.cdn(bea|sha|zack|ntr|gwc|hth|hjk)\.(org|cc|net|club)\/ad_template url reject-200
^https?:\/\/www\.cdn(bea|sha|zack|ntr|gwc|hth|hjk)\.(org|cc|net|club)\/chapter_view_template url script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/novel.js
  # 广告/视频/游戏
^https?:\/\/www\.cdn(bea|sha|zack|ntr|gwc|hth|hjk)\.(org|cc|net|club)\/(advertise|allgames|videos|advertise_all|ad_content_all) url reject-dict
  #logo
^https?:\/\/(cdn-msp(\d)*|cn-appdata|tencent)\.(jmapiproxy|jmdanjonproxy|18comic)(\d)*\.(cc|vip|xyz|ink|vip)\/media\/logo url reject-200
  # banner/floatAd
^https?:\/\/(cdn-msp(\d)*|cn-appdata|tencent)\.(jmapiproxy|jmdanjonproxy|18comic)(\d)*\.(cc|vip|xyz|ink|vip)\/static\/resources\/images url reject-200
^https?:\/\/(cdn-msp(\d)*|cn-appdata|tencent)\.(jmapiproxy|jmdanjonproxy|18comic)(\d)*\.(cc|vip|xyz|ink|vip)\/static\/resources\/files\/(.*)?\.gif url reject-200
^https?:\/\/(s|syndication)\.(chnsrv|realsrv)\.com\/v1\/api\.php url response-body "zones":\[.+\],"renderers":\{.+\} response-body "zones":[],"renderers":{}
^https?:\/\/a\.(chnsrv|realsrv)\.com\/ url reject-200

# jmplus.js

# web - kill all ad

^https?:\/\/(18comic|jmcomic-zzz)\.(vip|ink|one|org)/static\/resources\/images url reject-200
^https?:\/\/(18comic|jmcomic-zzz)\.(vip|ink|one|org)\/static\/resources\/files\/(.*)?\.gif url reject-200

^https?:\/\/(18comic|jmcomic-zzz)\.(vip|ink|one|org) text/html url-and-header script-response-body https://raw.githubusercontent.com/theload9638/myScripts/main/scripts/novel.js

[mitm]
hostname = syndication.realsrv.com,a.realsrv.com,jmcomic-zzz.one,jmcomic-zzz.org,18comic.ink,18comic.vip,www.cdnbea.org,www.cdnsha.org,www.cdnzack.cc,www.cdnntr.cc,www.cdnhth.club,www.cdngwc.cc,www.cdngwc.club,www.cdngwc.net,www.cdnhjk.cc,cdn-msp*.jmapiproxy*.*,cn-appdata.jmapiproxy*.cc,cdn-msp*.jmdanjonproxy*.*,cdn-msp*.18comic.*,tencent.jmdanjonproxy.xyz,s.chnsrv.com,a.chnsrv.com


*/