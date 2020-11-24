--
-- PostgreSQL database dump
--

-- Dumped from database version 11.0
-- Dumped by pg_dump version 11.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: entrada; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.entrada (
    id integer NOT NULL,
    deporte smallint NOT NULL,
    area smallint NOT NULL,
    tag3 character varying(40) NOT NULL,
    tag4 character varying(40) NOT NULL,
    tag5 character varying(40) NOT NULL,
    tiempo timestamp without time zone DEFAULT now() NOT NULL,
    comentario character varying(150) DEFAULT NULL::character varying,
    ver smallint DEFAULT 1 NOT NULL,
    CONSTRAINT entrada_area_check CHECK ((area >= 0)),
    CONSTRAINT entrada_deporte_check CHECK ((deporte >= 0)),
    CONSTRAINT entrada_id_check CHECK ((id >= 0)),
    CONSTRAINT entrada_ver_check CHECK ((ver >= 0))
);


ALTER TABLE public.entrada OWNER TO victordbu;

--
-- Name: entrada_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.entrada_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.entrada_id_seq OWNER TO victordbu;

--
-- Name: entrada_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.entrada_id_seq OWNED BY public.entrada.id;


--
-- Name: foto; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.foto (
    id integer NOT NULL,
    ancho smallint NOT NULL,
    alto smallint NOT NULL,
    tipo smallint NOT NULL,
    entradaid integer NOT NULL,
    CONSTRAINT foto_alto_check CHECK ((alto >= 0)),
    CONSTRAINT foto_ancho_check CHECK ((ancho >= 0)),
    CONSTRAINT foto_entradaid_check CHECK ((entradaid >= 0)),
    CONSTRAINT foto_id_check CHECK ((id >= 0)),
    CONSTRAINT foto_tipo_check CHECK ((tipo >= 0))
);


ALTER TABLE public.foto OWNER TO victordbu;

--
-- Name: foto_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.foto_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.foto_id_seq OWNER TO victordbu;

--
-- Name: foto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.foto_id_seq OWNED BY public.foto.id;


--
-- Name: entrada id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.entrada ALTER COLUMN id SET DEFAULT nextval('public.entrada_id_seq'::regclass);


--
-- Name: foto id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.foto ALTER COLUMN id SET DEFAULT nextval('public.foto_id_seq'::regclass);


--
-- Data for Name: entrada; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.entrada (id, deporte, area, tag3, tag4, tag5, tiempo, comentario, ver) FROM stdin;
1	0	0	Donqueando	Carolina	basket norte caserio	2016-01-01 19:32:44	Practicando me sale este donqueo, en el juego no es tan facil.	1
2	0	1	basket sur 3pa3	Barrio San Anton	Ponce	2016-01-02 02:54:45	El equipo de San Anton gano hoy su primer juego.	1
3	0	2	Little Lads	basket oeste Aguadilla	Isabela	2016-01-03 02:54:45	El equipo 13U de Isabela sigue invicto. El Lunes pa Ponce.	1
4	0	3	Copa Little Lads del Caribe	U15	basket este Panama	2016-01-04 23:30:03	Este era uno de los juegos mas dificiles, pero Canovanas representando a Puerto Rico, gano ayer.	1
5	1	0	Toques	11 y 12	beisbol norte Yankees	2016-01-05 02:54:45	La practica de toques no es la favorita de ellos, pero aqui en la liga de Arecibo, se practican.	1
6	1	1	Liga Coamo	Maratonistas	beisbol sur 5 y 6	2016-01-06 02:54:45	Ready y loco por empezar nuestro nuevo torneo local.	1
7	1	2	Coqui	beisbol oeste Lares	San Sebastian	2016-01-07 02:54:45	Pa la final del Torneo Estatal  Categoria Coqui.	1
8	1	3	Little League World Series	beisbol este Loiza	Pre Major	2016-01-08 02:54:45	En el Little League World Series ... hoy le ganamos a Costa Rica .... ahi, pa ti !	1
9	2	0	Manejo y Control de Balon	Bayamon Baby Soccer	Entrenamineto Individual futbol norte	2016-01-09 02:54:45	Trabajando con los fundamentos, esta es una inversion que vale la pena.	1
10	2	1	Leones futbol sur	Torneo de Otono	Juego Amistoso - Fogueo	2016-01-10 02:54:45	Durante el segundo juego de nuestra temporada del torneo de otono.	1
11	2	2	Wesol futbol oeste	Asociacion del Oeste de Balompie	Copa de Campeones InterLiga	2016-01-11 02:54:45	Hoy se decidio por penales, asi es que me gusta a mi.	1
12	2	3	Copa Internacional de Futbol Infantiil	Fajardo Soccer Kids	Republica Dominicana futbol este	2016-01-12 02:54:45	Buen nivel de futbol en el caribe.  Necesitamos mas iniciativas como esta.	1
17	0	3	FIBA Americas	U17	@ Dubai Emiratos Arabes	2020-01-17 14:00:09	Ayer le ganamos a Espana y hoy a Italia, ni el cambio de hora nos detiene.	1
18	2	2	Rincon	Baby Soccer 8U	Leones vs Lobos	2020-01-18 03:26:16	Resultado de un  juego de soccer en Rincon.	1
13	3	1	Quileando voli sur	Division A - 12Under	Nenas Yaucanas	2016-01-14 02:54:45	Practicando los quileos... , hoy salieron casi todos.	1
14	3	2	Lares voli oeste	Torneo Entre Escuelas	4to Grado	2016-01-15 02:54:45	El que quiera ganarnos, que siga practicando ...	1
15	3	3	Rio Grande	Caguas Criollas	CNVPR voli este	2016-01-16 02:54:45	Resultado del juego Division Oro 14U.	1
20	3	0	bompeo	Bayamon	Liga Bayamon	2020-01-20 23:35:19	\N	1
16	3	0	Cien Fuegos, Cuba	Arecibo PR	CNVPR voli norte	2016-01-13 02:54:45	Pa demostrar, hoy le ganamos a Cuba, ya veras.	1
19	3	0	boleo	8vo grado	Copa Municipal entre Escuelas	2020-01-19 14:02:32	Estamos preparandonos pal torneo municipal en el pueblo de Luquillo. Las nenas de 8vo grado de la escuela Hostos empezaron en el verano a practicar.	1
22	0	3	FIBA Americas	U17	@ Dubai Emeiratos Arabes	2020-01-21 22:48:59	Con Egipto, ya en la etapa de cruces, pasamos un susto. GraciAS A Dios GANAMOS y estamos en los mejores 8 equipos U17 del mundo. Quien sera  proximo !	1
\.


--
-- Data for Name: foto; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.foto (id, ancho, alto, tipo, entradaid) FROM stdin;
1	1080	810	2	1
2	615	312	2	2
3	700	464	2	3
4	950	633	2	4
5	300	295	2	5
6	559	480	2	6
7	492	328	2	7
8	1000	666	2	8
9	259	194	2	9
10	450	408	2	10
11	600	400	2	11
12	400	294	2	12
13	698	850	2	13
14	950	827	2	14
15	640	461	2	15
16	662	700	2	16
17	1000	667	2	17
18	950	516	2	19
19	950	516	2	20
20	1000	667	2	22
\.


--
-- Name: entrada_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.entrada_id_seq', 1, true);


--
-- Name: foto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.foto_id_seq', 1, false);


--
-- Name: entrada entrada_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.entrada
    ADD CONSTRAINT entrada_pkey PRIMARY KEY (id);


--
-- Name: foto foto_entradaid_key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.foto
    ADD CONSTRAINT foto_entradaid_key UNIQUE (entradaid);


--
-- Name: foto foto_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.foto
    ADD CONSTRAINT foto_pkey PRIMARY KEY (id);


--
-- Name: foto foto_entradaid_fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.foto
    ADD CONSTRAINT foto_entradaid_fkey FOREIGN KEY (entradaid) REFERENCES public.entrada(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

