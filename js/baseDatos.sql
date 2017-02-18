-- phpMyAdmin SQL Dump
-- version 4.2.7.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-01-2017 a las 09:37:55
-- Versión del servidor: 5.6.20
-- Versión de PHP: 5.5.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `liga`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alineacion`
--

CREATE TABLE IF NOT EXISTS `alineacion` (
  `cod_partido` int(3) NOT NULL,
  `cod_jugador` int(4) NOT NULL,
  `cod_equipo` int(2) NOT NULL,
  `min_salida` int(3) NOT NULL,
  `min_entrada` int(3) NOT NULL,
  `min_jugados` int(3) NOT NULL,
  `faltas_recibidas` int(2) NOT NULL,
  `faltas_realizadas` int(2) NOT NULL,
  `pases` int(2) NOT NULL,
  `paradas` int(2) NOT NULL,
  `posicion` varchar(30) NOT NULL,
  `observaciones` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `arbitros`
--

CREATE TABLE IF NOT EXISTS `arbitros` (
`cod_arbitro` int(3) NOT NULL,
  `nif` char(9) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `fecha_nac` date NOT NULL,
  `categoria` int(2) NOT NULL,
  `tipo` enum('principal','linea1','linea2','cuarto arbitro') NOT NULL,
  `num_temporadas` int(2) NOT NULL,
  `colegio_arbitral` varchar(50) NOT NULL,
  `foto_arbitro` varchar(255) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contratos`
--

CREATE TABLE IF NOT EXISTS `contratos` (
`cod_contrato` int(4) NOT NULL,
  `cod_equipo` int(2) NOT NULL,
  `cod_jugador` int(4) NOT NULL,
  `fecha` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `ficha` int(8) NOT NULL,
  `clausula_recision` int(9) NOT NULL,
  `tipo` varchar(30) NOT NULL,
  `observaciones` longtext NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `entrenadores`
--

CREATE TABLE IF NOT EXISTS `entrenadores` (
`cod_entrenador` int(2) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `fecha_nac` date NOT NULL,
  `nacionalidad` varchar(30) NOT NULL,
  `foto_entrenador` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

CREATE TABLE IF NOT EXISTS `equipo` (
`cod_equipo` int(2) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `estadio` varchar(30) NOT NULL,
  `division` enum('primera','segunda') NOT NULL,
  `aforo` int(5) NOT NULL,
  `ciudad` varchar(30) NOT NULL,
  `presidente` varchar(50) NOT NULL,
  `fecha_fundacion` date NOT NULL,
  `num_socios` int(6) NOT NULL,
  `escudo` varchar(255) NOT NULL,
  `foto_estadio` varchar(255) NOT NULL,
  `partidosEmpatados` int(3) NOT NULL,
  `partidosGanados` int(3) NOT NULL,
  `partidosPerdidos` int(3) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo_entrenador`
--

CREATE TABLE IF NOT EXISTS `equipo_entrenador` (
  `cod_entrenador` int(2) NOT NULL,
  `cod_equipo` int(2) NOT NULL,
  `fecha_contrato` date NOT NULL,
  `fecha_fin_contrato` date NOT NULL,
  `ficha` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `incidencias`
--

CREATE TABLE IF NOT EXISTS `incidencias` (
`cod_incidencia` int(6) NOT NULL,
  `cod_partido` int(3) NOT NULL,
  `cod_jugador` int(4) NOT NULL,
  `tipo_incidencia` enum('tarjeta','gol_realizado','falta_realizada','falta_recibida','gol_recibido','penalti','corner','fuera_juego','asistencias','entrada_jugador','lesion','salida_jugador') NOT NULL,
  `minuto` int(3) NOT NULL,
  `observaciones` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jugadores`
--

CREATE TABLE IF NOT EXISTS `jugadores` (
`cod_jugador` int(4) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `fecha_nac` date NOT NULL,
  `internacionalidades` int(3) NOT NULL,
  `nacionalidad` varchar(30) NOT NULL,
  `altura` int(3) NOT NULL,
  `peso` int(3) NOT NULL,
  `foto_jugador` varchar(255) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=3 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lesiones`
--

CREATE TABLE IF NOT EXISTS `lesiones` (
`cod_lesion` int(2) NOT NULL,
  `cod_jugador` int(4) NOT NULL,
  `fechaInicio` date NOT NULL,
  `fechaFin` date NOT NULL,
  `tipo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partido`
--

CREATE TABLE IF NOT EXISTS `partido` (
`cod_partido` int(3) NOT NULL,
  `cod_equipoVisitante` int(2) NOT NULL,
  `cod_equipoLocal` int(2) NOT NULL,
  `goles_Visitante` int(2) NOT NULL,
  `goles_Locales` int(2) NOT NULL,
  `fecha` date NOT NULL,
  `asistentes` int(5) NOT NULL,
  `cod_arbitro_principal` int(3) NOT NULL,
  `cod_arbitro_linea1` int(3) NOT NULL,
  `cod_arbitro_linea2` int(3) NOT NULL,
  `cod_cuarto_arbitro` int(3) NOT NULL,
  `jornada` int(2) NOT NULL,
  `division` enum('primera','segunda') NOT NULL,
  `video` varchar(50) NOT NULL,
  `estado` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE IF NOT EXISTS `usuarios` (
  `nombre` varchar(50) NOT NULL,
  `contrasena` varchar(50) NOT NULL,
  `tipo` enum('usuario','administrador') NOT NULL,
  `email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alineacion`
--
ALTER TABLE `alineacion`
 ADD PRIMARY KEY (`cod_partido`,`cod_jugador`), ADD KEY `FK_Equipo_Alineacion` (`cod_equipo`), ADD KEY `FK_Jugador_Alineacion` (`cod_jugador`), ADD KEY `FK_Partido_Alineacion` (`cod_partido`);

--
-- Indices de la tabla `arbitros`
--
ALTER TABLE `arbitros`
 ADD PRIMARY KEY (`cod_arbitro`), ADD UNIQUE KEY `nif` (`nif`);

--
-- Indices de la tabla `contratos`
--
ALTER TABLE `contratos`
 ADD PRIMARY KEY (`cod_contrato`), ADD KEY `FK_Equipo_Contrato` (`cod_equipo`), ADD KEY `FK_Jugador_Contrato` (`cod_jugador`);

--
-- Indices de la tabla `entrenadores`
--
ALTER TABLE `entrenadores`
 ADD PRIMARY KEY (`cod_entrenador`);

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
 ADD PRIMARY KEY (`cod_equipo`);

--
-- Indices de la tabla `equipo_entrenador`
--
ALTER TABLE `equipo_entrenador`
 ADD PRIMARY KEY (`cod_entrenador`,`cod_equipo`), ADD KEY `FK_contrato_equipo` (`cod_equipo`);

--
-- Indices de la tabla `incidencias`
--
ALTER TABLE `incidencias`
 ADD PRIMARY KEY (`cod_incidencia`), ADD KEY `FK_Partido_Incidencia` (`cod_partido`), ADD KEY `FK_Jugadores_Incidencia` (`cod_jugador`);

--
-- Indices de la tabla `jugadores`
--
ALTER TABLE `jugadores`
 ADD PRIMARY KEY (`cod_jugador`);

--
-- Indices de la tabla `lesiones`
--
ALTER TABLE `lesiones`
 ADD PRIMARY KEY (`cod_lesion`);

--
-- Indices de la tabla `partido`
--
ALTER TABLE `partido`
 ADD PRIMARY KEY (`cod_partido`), ADD KEY `FK_arbitroLinea1` (`cod_arbitro_linea1`), ADD KEY `FK_arbitroLinea2` (`cod_arbitro_linea2`), ADD KEY `FK_arbitroPrincipal` (`cod_arbitro_principal`), ADD KEY `FK_cuartoArbitro` (`cod_cuarto_arbitro`), ADD KEY `FK_equipoLocal` (`cod_equipoLocal`), ADD KEY `FK_equipoVisitantante` (`cod_equipoVisitante`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
 ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `arbitros`
--
ALTER TABLE `arbitros`
MODIFY `cod_arbitro` int(3) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `contratos`
--
ALTER TABLE `contratos`
MODIFY `cod_contrato` int(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `entrenadores`
--
ALTER TABLE `entrenadores`
MODIFY `cod_entrenador` int(2) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
MODIFY `cod_equipo` int(2) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `incidencias`
--
ALTER TABLE `incidencias`
MODIFY `cod_incidencia` int(6) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `jugadores`
--
ALTER TABLE `jugadores`
MODIFY `cod_jugador` int(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `lesiones`
--
ALTER TABLE `lesiones`
MODIFY `cod_lesion` int(2) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `partido`
--
ALTER TABLE `partido`
MODIFY `cod_partido` int(3) NOT NULL AUTO_INCREMENT;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alineacion`
--
ALTER TABLE `alineacion`
ADD CONSTRAINT `FK_Equipo_Alineacion` FOREIGN KEY (`cod_equipo`) REFERENCES `equipo` (`cod_equipo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_Jugador_Alineacion` FOREIGN KEY (`cod_jugador`) REFERENCES `jugadores` (`cod_jugador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_Partido_Alineacion` FOREIGN KEY (`cod_partido`) REFERENCES `partido` (`cod_partido`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `contratos`
--
ALTER TABLE `contratos`
ADD CONSTRAINT `FK_Equipo_Contrato` FOREIGN KEY (`cod_equipo`) REFERENCES `equipo` (`cod_equipo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_Jugador_Contrato` FOREIGN KEY (`cod_jugador`) REFERENCES `jugadores` (`cod_jugador`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `equipo_entrenador`
--
ALTER TABLE `equipo_entrenador`
ADD CONSTRAINT `FK_contrato_equipo` FOREIGN KEY (`cod_equipo`) REFERENCES `equipo` (`cod_equipo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_entrenador_contrato` FOREIGN KEY (`cod_entrenador`) REFERENCES `entrenadores` (`cod_entrenador`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `incidencias`
--
ALTER TABLE `incidencias`
ADD CONSTRAINT `FK_Jugadores_Incidencia` FOREIGN KEY (`cod_jugador`) REFERENCES `jugadores` (`cod_jugador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_Partido_Incidencia` FOREIGN KEY (`cod_partido`) REFERENCES `partido` (`cod_partido`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `lesiones`
--
ALTER TABLE `lesiones`
ADD CONSTRAINT `FK_Jugador_lesion` FOREIGN KEY (`cod_lesion`) REFERENCES `jugadores` (`cod_jugador`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `partido`
--
ALTER TABLE `partido`
ADD CONSTRAINT `FK_arbitroLinea1` FOREIGN KEY (`cod_arbitro_linea1`) REFERENCES `arbitros` (`cod_arbitro`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_arbitroLinea2` FOREIGN KEY (`cod_arbitro_linea2`) REFERENCES `arbitros` (`cod_arbitro`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_arbitroPrincipal` FOREIGN KEY (`cod_arbitro_principal`) REFERENCES `arbitros` (`cod_arbitro`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_cuartoArbitro` FOREIGN KEY (`cod_cuarto_arbitro`) REFERENCES `arbitros` (`cod_arbitro`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_equipoLocal` FOREIGN KEY (`cod_equipoLocal`) REFERENCES `equipo` (`cod_equipo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
ADD CONSTRAINT `FK_equipoVisitantante` FOREIGN KEY (`cod_equipoVisitante`) REFERENCES `equipo` (`cod_equipo`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
