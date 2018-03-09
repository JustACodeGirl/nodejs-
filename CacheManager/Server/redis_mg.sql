-- phpMyAdmin SQL Dump
-- version 3.4.9
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2017 年 01 月 19 日 07:50
-- 服务器版本: 5.5.20
-- PHP 版本: 5.3.9

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `redis_mg`
--

-- --------------------------------------------------------

--
-- 表的结构 `t_cache`
--

CREATE TABLE IF NOT EXISTS `t_cache` (
  `cache_name` varchar(50) NOT NULL,
  `server_id` int(11) NOT NULL,
  `desc` varchar(50) NOT NULL,
  `pattern_key` varchar(50) NOT NULL,
  `pattern_value` varchar(50) NOT NULL,
  `type` char(50) NOT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=77 ;

--
-- 转存表中的数据 `t_cache`
--

INSERT INTO `t_cache` (`cache_name`, `server_id`, `desc`, `pattern_key`, `pattern_value`, `type`, `id`) VALUES
('User_Fans', 29, '用户粉丝集合', 'U:{0}:Fans', '用户的粉丝的ID', 'zset', 36),
('User_Followed', 29, '用户关注了哪些人的集合', 'U:{0}:Fol', '用户关注人的ID', 'zset', 37),
('Resource', 29, '资源信息', 'Res:{0}', '存储资源信息的Map', 'map', 38),
('Resource_Common', 29, '资源的评论', 'Res:{0}:Comm', '存储获取资源时需要带上的3-6条评论的ID', 'zset', 39),
('RecommendResource', 29, '推荐资源', 'Res:Rec', '存储推荐资源的ID，按ID排序', 'zset', 42),
('UserResource', 29, '用户资源缓存', 'U:{0}:Res', '存储用户的资源的ID，按ID排序', 'zset', 43),
('UserFollowResource', 29, '用户朋友圈资源', 'U:{0}:Fol:Res', '存储用户关注的用户发的资源的ID', 'zset', 44),
('ResourcePraise', 29, '资源点赞用户', 'Res:{0}:Pra', '存储给资源点在的用户ID', 'set', 45),
('Comment', 29, '评论信息', 'Comm:{0}', '存储评论信息的Map结构', 'map', 46),
('AuthCode', 29, '验证码', 'Auth:{0}', '存储手机验证码的String', 'value', 47),
('Tag', 29, '标签', 'Tag:{0}', '存储标签的name', 'value', 49),
('UserTag', 29, '用户感兴趣的标签', 'U:{0}:Tag', '存储用户感兴趣的标签ID', 'set', 50),
('User', 29, 'User', 'U:{0}', '11', 'map', 75),
('KEY_RESOURCE_SCORE', 29, '资源的分数', 'Res:Score', '存储每个资源的分数(评论+分享+点赞+转发)', 'zset', 76);

-- --------------------------------------------------------

--
-- 表的结构 `t_list`
--

CREATE TABLE IF NOT EXISTS `t_list` (
  `key` varchar(50) NOT NULL,
  `value` varchar(50) NOT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `t_search`
--

CREATE TABLE IF NOT EXISTS `t_search` (
  `id` int(3) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `solrIndexListApi` varchar(300) NOT NULL,
  `password` varchar(50) NOT NULL,
  `solrAdmin` varchar(50) NOT NULL,
  `description` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=5 ;

--
-- 转存表中的数据 `t_search`
--

INSERT INTO `t_search` (`id`, `name`, `solrIndexListApi`, `password`, `solrAdmin`, `description`) VALUES
(1, 'SOLR-QA', 'http://121.43.124.241:40092/solr/index/cores', '4444', 'http://121.43.124.241:40092/solr/index.html', 'solr-qa'),
(2, '133', '133', '', '133', '133');

-- --------------------------------------------------------

--
-- 表的结构 `t_server`
--

CREATE TABLE IF NOT EXISTS `t_server` (
  `server_name` varchar(50) DEFAULT NULL,
  `host` varchar(50) DEFAULT NULL,
  `port` varchar(10) DEFAULT NULL,
  `clearCacheApi` varchar(100) NOT NULL,
  `rebuildCacheApi` varchar(100) NOT NULL,
  `password` varchar(50) DEFAULT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=31 ;

--
-- 转存表中的数据 `t_server`
--

INSERT INTO `t_server` (`server_name`, `host`, `port`, `clearCacheApi`, `rebuildCacheApi`, `password`, `id`) VALUES
('Jinzhong', '121.43.124.241', '16379', 'server/clear1111111111111111111111111111111111111111', 'server/rebuild1111111111111111111111111111111111111', 'admin123', 29),
('OV3D-QA', '121.43.124.241', '16379', 'http://121.43.124.241:49090/ov3dService/api/v3/common/flush/all/redis', 'http://121.43.124.241:49090/ov3dService/api/v3/common/preload/all/redis', '1', 30);

-- --------------------------------------------------------

--
-- 表的结构 `t_solr`
--

CREATE TABLE IF NOT EXISTS `t_solr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `search_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `clear_api` varchar(100) NOT NULL,
  `rebuild_api` varchar(100) NOT NULL,
  `update_api` varchar(300) NOT NULL,
  `delete_api` varchar(300) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=195 ;

--
-- 转存表中的数据 `t_solr`
--

INSERT INTO `t_solr` (`id`, `search_id`, `name`, `clear_api`, `rebuild_api`, `update_api`, `delete_api`) VALUES
(2, 1, 'tag', 'http://121.43.124.241:49092/ov3d/users/query/bystate?clientType=web&count=12&index=0&state=EFFECTIVE', 'http://121.43.124.241:49092/ov3d/users/query/bystate?clientType=web&count=12&index=0&state=EFFECTIVE', 'http://121.43.124.241:49095/solr/api/solr/index/update?core=topic&ids=', 'http://121.43.124.241:49095/solr/api/solr/index/delete?core=topic&ids='),
(4, 2, 'topic', '44444', '444444', '', ''),
(58, 1, 'user', 'http://www.baidu.com', 'http://www.baidu.com', '', ''),
(94, 1, 'topic', 'http://www.baidu.com', 'http://www.baidu.com', '', ''),
(194, 1, 'resource', '12345', '12345', '12345', '1234');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
