
CREATE DATABASE IF NOT EXISTS `ovdatamanagerdb` DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
USE `ovdatamanagerdb`;

GRANT ALL PRIVILEGES ON ovdatamanagerdb.* to 'ovdm'@'%' IDENTIFIED BY 'ovdm';
GRANT ALL PRIVILEGES ON ovdatamanagerdb.* to 'ovdm'@'localhost' IDENTIFIED BY 'ovdm';

--
-- 数据库: `ovdatamanagerdb`
--

-- --------------------------------------------------------

--
-- 表的结构 `t_cache`
--

CREATE TABLE IF NOT EXISTS `t_cache` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `cache_name` varchar(50) NOT NULL,
  `server_id` int(11) NOT NULL,
  `desc` varchar(50) NOT NULL,
  `pattern_key` varchar(50) NOT NULL,
  `pattern_value` varchar(50) NOT NULL,
  `type` char(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=81 ;

--
-- 转存表中的数据 `t_cache`
--

INSERT INTO `t_cache` (`cache_name`, `server_id`, `desc`, `pattern_key`, `pattern_value`, `type`, `id`) VALUES
('User_Fans', 29, '用户粉丝集合', 'U:{0}:Fans', '用户的粉丝的ID', 'set', 36),
('User_Followed', 29, '用户关注了哪些人的集合', 'U:{0}:Fol', '用户关注人的ID', 'set', 37),
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
('cache_list', 55, 'set', 'key', 'value', 'list', 77),
('cache_set', 55, 'cache_set', 'key', 'value', 'set', 78),
('cache_zset', 55, 'cache_zset', 'key', 'value', 'zset', 79),
('cache_value', 55, 'cache_value', 'key', 'value', 'value', 80);

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
  `host` varchar(50) NOT NULL,
  `port` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `description` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `t_search`
--

INSERT INTO `t_search` (`id`, `name`, `host`, `port`, `password`, `description`) VALUES
(1, 'SOLR-QA', '121.43.124.241', '40092', '111', 'solr-qa'),
(2, 'SOLR-PROD', '10.88.17.81', '10081', '', 'solr-prod'),
(5, 'ES-QA', '10.88.17.82', '10082', '111111', 'es-qa');

-- --------------------------------------------------------

--
-- 表的结构 `t_server`
--

CREATE TABLE IF NOT EXISTS `t_server` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `server_name` varchar(50) DEFAULT NULL,
  `host` varchar(50) DEFAULT NULL,
  `port` varchar(10) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=58 ;

--
-- 转存表中的数据 `t_server`
--

INSERT INTO `t_server` (`server_name`, `host`, `port`, `password`, `id`) VALUES
('ov3d_QA', '10.88.17.108', '6379', 'admin123', 29),
('测试_1', '10.88.17.110', '10081', '123456', 55),
('11115', '111111115', '1111115', '1111111115', 57);

