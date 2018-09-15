/*
Navicat MySQL Data Transfer

Source Server         : panpnagpang
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : jiuji

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-09-15 18:30:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(11) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `user` varchar(255) NOT NULL,
  `paw` varchar(255) NOT NULL,
  `phonenum` int(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('00000000001', '$user', '$paw', '777', '77@qq.com', '2018-09-15 18:07:22');
