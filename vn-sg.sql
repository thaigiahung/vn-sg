-- MySQL dump 10.13  Distrib 5.1.73, for redhat-linux-gnu (i386)
--
-- Host: localhost    Database: vn-sg
-- ------------------------------------------------------
-- Server version	5.1.73

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nameAscii` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Wool Toys',NULL,1,'2015-09-20 08:43:53','2015-12-26 23:39:24');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faillogincount`
--

DROP TABLE IF EXISTS `faillogincount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faillogincount` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `ip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `numOfTime` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faillogincount`
--

LOCK TABLES `faillogincount` WRITE;
/*!40000 ALTER TABLE `faillogincount` DISABLE KEYS */;
/*!40000 ALTER TABLE `faillogincount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lock`
--

DROP TABLE IF EXISTS `lock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lock` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `ip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lock`
--

LOCK TABLES `lock` WRITE;
/*!40000 ALTER TABLE `lock` DISABLE KEYS */;
/*!40000 ALTER TABLE `lock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `login` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `ip` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `uuid` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `emailResult` longtext COLLATE utf8_unicode_ci,
  `receiver` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lat` float DEFAULT NULL,
  `lng` float DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phoneCountry` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `total` float DEFAULT NULL,
  `note` longtext COLLATE utf8_unicode_ci,
  `status` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetail`
--

DROP TABLE IF EXISTS `orderdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orderdetail` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order` int(11) DEFAULT NULL,
  `product` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `total` float DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetail`
--

LOCK TABLES `orderdetail` WRITE;
/*!40000 ALTER TABLE `orderdetail` DISABLE KEYS */;
/*!40000 ALTER TABLE `orderdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `nameAscii` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` longtext COLLATE utf8_unicode_ci,
  `descriptionAscii` longtext COLLATE utf8_unicode_ci,
  `price` float DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `outOfStock` int(11) DEFAULT NULL,
  `sold` int(11) DEFAULT NULL,
  `revenue` float DEFAULT NULL,
  `priority` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,1,'WT-01',NULL,'<ul>\n<li>Size&nbsp;(cm):&nbsp;29x12</li>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,14,100,1,0,0,0,1,'2015-12-27 02:50:11','2015-12-27 05:10:40'),(2,1,'WT-02',NULL,'<ul>\n<li>Size (cm):&nbsp;62x3</li>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,14,100,1,0,0,0,2,'2015-12-27 02:56:04','2015-12-27 03:42:20'),(3,1,'WT-05',NULL,'<ul>\n<li>Size (cm): R=5</li>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,4,100,1,0,0,0,3,'2015-12-27 02:57:41','2015-12-27 03:42:24'),(4,1,'WT-06',NULL,'<ul>\n<li>Size (cm): 30x10</li>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,17,100,1,0,0,0,4,'2015-12-27 02:58:26','2015-12-27 03:42:29'),(5,1,'WT-07',NULL,'<ul>\n<li>Size (cm): 29x15</li>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,21,100,1,0,0,0,5,'2015-12-27 02:59:32','2015-12-27 03:42:33'),(6,1,'WT-08',NULL,'<ul>\n<li>Size (cm): 23x15x11</li>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,20,100,1,0,0,0,6,'2015-12-27 03:00:18','2015-12-27 03:42:38'),(7,1,'WT-09',NULL,'<ul>\n<li>Size (cm):&nbsp;14x10</li>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,12,100,1,0,0,0,7,'2015-12-27 03:01:04','2015-12-27 03:42:42'),(8,1,'WT-10',NULL,'<ul>\n<li>Size (cm): 10x13x9.5</li>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,14,100,1,0,0,0,8,'2015-12-27 03:01:36','2015-12-27 03:42:46'),(9,1,'WT-11',NULL,'<ul>\n<li>Size (cm): 12x14.5x12</li>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,14,100,1,0,0,0,9,'2015-12-27 03:03:08','2015-12-27 03:42:50'),(10,1,'WT-12',NULL,'<ul>\n<li>Size (cm): 27x12</li>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,14,100,1,0,0,0,10,'2015-12-27 03:03:48','2015-12-27 03:42:59'),(11,1,'WT-13',NULL,'<ul>\n<li>Size (cm): 28x12</li>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,16,100,1,0,0,0,11,'2015-12-27 03:04:41','2015-12-27 03:43:05'),(12,1,'WT-14',NULL,'<ul>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,24,100,1,0,0,0,12,'2015-12-27 03:20:02','2015-12-27 03:43:09'),(13,1,'WT-15',NULL,'<ul>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,6,100,1,0,0,0,13,'2015-12-27 03:33:11','2015-12-27 03:43:15'),(14,1,'WT-16',NULL,'<ul>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,24,100,1,0,0,0,14,'2015-12-27 03:33:39','2015-12-27 03:43:19'),(15,1,'WT-17',NULL,'<ul>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,32,100,1,0,0,0,15,'2015-12-27 03:34:27','2015-12-27 03:43:24'),(16,1,'WT-18',NULL,'<ul>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,25,100,1,0,0,0,16,'2015-12-27 03:34:56','2015-12-27 03:36:46'),(17,1,'WT-19',NULL,'<ul>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,24,100,1,0,0,0,16,'2015-12-27 03:36:03','2015-12-27 03:36:03'),(18,1,'WT-20',NULL,'<ul>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,27,100,1,0,0,0,18,'2015-12-27 03:37:35','2015-12-27 03:37:35'),(19,1,'WT-21',NULL,'<ul>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,22,100,1,0,0,0,19,'2015-12-27 03:37:54','2015-12-27 03:37:54'),(20,1,'WT-22',NULL,'<ul>\n<li>Material: Vietnam\'s wool</li>\n</ul>',NULL,25,100,1,0,0,0,20,'2015-12-27 03:38:10','2015-12-27 03:38:10');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productimages`
--

DROP TABLE IF EXISTS `productimages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productimages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product` int(11) DEFAULT NULL,
  `url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` longtext COLLATE utf8_unicode_ci,
  `status` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productimages`
--

LOCK TABLES `productimages` WRITE;
/*!40000 ALTER TABLE `productimages` DISABLE KEYS */;
INSERT INTO `productimages` VALUES (1,1,'/images/products/1/1.jpg',NULL,1,'2015-12-27 02:54:12','2015-12-27 02:54:12'),(2,2,'/images/products/2/2.jpg',NULL,1,'2015-12-27 02:56:40','2015-12-27 02:56:40'),(3,3,'/images/products/3/3.jpg',NULL,1,'2015-12-27 03:06:59','2015-12-27 03:06:59'),(4,4,'/images/products/4/6.jpg',NULL,1,'2015-12-27 03:07:27','2015-12-27 03:07:27'),(5,5,'/images/products/5/7.jpg',NULL,1,'2015-12-27 03:07:38','2015-12-27 03:07:38'),(6,6,'/images/products/6/8.jpg',NULL,1,'2015-12-27 03:07:55','2015-12-27 03:07:55'),(7,7,'/images/products/7/9.jpg',NULL,1,'2015-12-27 03:08:28','2015-12-27 03:08:28'),(8,8,'/images/products/8/10.jpg',NULL,1,'2015-12-27 03:08:45','2015-12-27 03:08:45'),(9,9,'/images/products/9/11.jpg',NULL,1,'2015-12-27 03:08:56','2015-12-27 03:08:56'),(10,10,'/images/products/10/12.jpg',NULL,1,'2015-12-27 03:09:14','2015-12-27 03:09:14'),(11,11,'/images/products/11/13.jpg',NULL,1,'2015-12-27 03:09:38','2015-12-27 03:09:38'),(12,12,'/images/products/12/14.jpg',NULL,1,'2015-12-27 03:26:38','2015-12-27 03:26:38'),(13,13,'/images/products/13/15.jpg',NULL,1,'2015-12-27 03:38:51','2015-12-27 03:38:51'),(14,14,'/images/products/14/16.jpg',NULL,1,'2015-12-27 03:39:08','2015-12-27 03:39:08'),(15,15,'/images/products/15/17.jpg',NULL,1,'2015-12-27 03:39:19','2015-12-27 03:39:19'),(16,18,'/images/products/18/20.jpg',NULL,1,'2015-12-27 03:40:04','2015-12-27 03:40:04'),(17,19,'/images/products/19/21.jpg',NULL,1,'2015-12-27 03:40:20','2015-12-27 03:40:20'),(18,20,'/images/products/20/22.jpg',NULL,1,'2015-12-27 03:40:43','2015-12-27 03:40:43'),(19,17,'/images/products/17/19.jpg',NULL,1,'2015-12-27 03:41:06','2015-12-27 03:41:06'),(20,16,'/images/products/16/18.jpg',NULL,1,'2015-12-27 03:41:21','2015-12-27 03:41:21');
/*!40000 ALTER TABLE `productimages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Owner',1,'2015-09-20 00:00:00','2015-09-20 00:00:00'),(2,'User',1,'2015-09-20 00:00:00','2015-09-20 00:00:00');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trackingproduct`
--

DROP TABLE IF EXISTS `trackingproduct`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trackingproduct` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `product` int(11) DEFAULT NULL,
  `action` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trackingproduct`
--

LOCK TABLES `trackingproduct` WRITE;
/*!40000 ALTER TABLE `trackingproduct` DISABLE KEYS */;
/*!40000 ALTER TABLE `trackingproduct` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trackingshipment`
--

DROP TABLE IF EXISTS `trackingshipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trackingshipment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order` int(11) DEFAULT NULL,
  `type` int(11) DEFAULT NULL,
  `url` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `message` longtext COLLATE utf8_unicode_ci,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trackingshipment`
--

LOCK TABLES `trackingshipment` WRITE;
/*!40000 ALTER TABLE `trackingshipment` DISABLE KEYS */;
/*!40000 ALTER TABLE `trackingshipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `role` int(11) DEFAULT NULL,
  `username` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,1,'hung','a92f966c0e9ea5fc3960dfae52b7739b7953e603',1,'2015-09-20 00:00:00','2015-09-20 00:00:00');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userprofile`
--

DROP TABLE IF EXISTS `userprofile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userprofile` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `fbId` int(11) DEFAULT NULL,
  `fbJson` longtext COLLATE utf8_unicode_ci,
  `ggId` int(11) DEFAULT NULL,
  `ggJson` longtext COLLATE utf8_unicode_ci,
  `lastName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `firstName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `question` longtext COLLATE utf8_unicode_ci,
  `answer` longtext COLLATE utf8_unicode_ci,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userprofile`
--

LOCK TABLES `userprofile` WRITE;
/*!40000 ALTER TABLE `userprofile` DISABLE KEYS */;
/*!40000 ALTER TABLE `userprofile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wishlist` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user` int(11) DEFAULT NULL,
  `product` int(11) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-11-29 21:25:14
