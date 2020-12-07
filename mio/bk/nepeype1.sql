-- --
-- PostgreSQL database dump
--

-- Dumped from database version 12.4
-- Dumped by pg_dump version 12.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.bregando DROP CONSTRAINT bregando_nepe_id;
ALTER TABLE ONLY public.bregando DROP CONSTRAINT bregando_dueno_id_fkey;
DROP INDEX public.nombre_que_vector_idx;
DROP INDEX public.donde_vector_idx;
ALTER TABLE ONLY public.nepe DROP CONSTRAINT nepe_pkey;
ALTER TABLE ONLY public.dueno DROP CONSTRAINT dueno_username_key;
ALTER TABLE ONLY public.dueno DROP CONSTRAINT dueno_pkey;
ALTER TABLE ONLY public.bregando DROP CONSTRAINT bregando_pkey;
ALTER TABLE public.nepe ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.dueno ALTER COLUMN id DROP DEFAULT;
ALTER TABLE public.bregando ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public.nepe_id_seq;
DROP TABLE public.nepe;
DROP SEQUENCE public.dueno_dueno_id_seq;
DROP TABLE public.dueno;
DROP SEQUENCE public.bregando_bregando_id_seq;
DROP TABLE public.bregando;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: bregando; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.bregando (
    dueno_id integer NOT NULL,
    nepe_id integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.bregando OWNER TO victordbu;

--
-- Name: bregando_bregando_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.bregando_bregando_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bregando_bregando_id_seq OWNER TO victordbu;

--
-- Name: bregando_bregando_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.bregando_bregando_id_seq OWNED BY public.bregando.id;


--
-- Name: dueno; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.dueno (
    id integer NOT NULL,
    username character varying(64) NOT NULL,
    password character varying(64) NOT NULL,
    last_log date DEFAULT '2010-01-01'::date NOT NULL,
    first_log date DEFAULT '2010-01-01'::date NOT NULL,
    CONSTRAINT dueno_first_log_check CHECK ((first_log > '2009-12-31'::date)),
    CONSTRAINT dueno_last_log_check CHECK ((last_log > '2009-12-31'::date))
);


ALTER TABLE public.dueno OWNER TO victordbu;

--
-- Name: dueno_dueno_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.dueno_dueno_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dueno_dueno_id_seq OWNER TO victordbu;

--
-- Name: dueno_dueno_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.dueno_dueno_id_seq OWNED BY public.dueno.id;


--
-- Name: nepe; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.nepe (
    id integer NOT NULL,
    nombre character varying(64) NOT NULL,
    revisado date DEFAULT '2010-01-01'::date NOT NULL,
    media_video_url character varying(128) NOT NULL,
    media_social_handle json NOT NULL,
    media_foto_url character varying(64)[] NOT NULL,
    que character varying(64)[] NOT NULL,
    donde character varying(64)[] NOT NULL,
    a_tu_casa boolean NOT NULL,
    nombre_que_vector tsvector NOT NULL,
    donde_vector tsvector NOT NULL,
    cuando json NOT NULL,
    CONSTRAINT nepe_revisado_check CHECK ((revisado > '2009-12-31'::date))
);


ALTER TABLE public.nepe OWNER TO victordbu;

--
-- Name: nepe_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.nepe_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nepe_id_seq OWNER TO victordbu;

--
-- Name: nepe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.nepe_id_seq OWNED BY public.nepe.id;


--
-- Name: bregando id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.bregando ALTER COLUMN id SET DEFAULT nextval('public.bregando_bregando_id_seq'::regclass);


--
-- Name: dueno id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno ALTER COLUMN id SET DEFAULT nextval('public.dueno_dueno_id_seq'::regclass);


--
-- Name: nepe id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe ALTER COLUMN id SET DEFAULT nextval('public.nepe_id_seq'::regclass);


--
-- Data for Name: bregando; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.bregando (dueno_id, nepe_id, id) FROM stdin;
1	1	3
2	2	4
3	3	5
4	4	6
4	5	7
5	6	8
6	6	9
10	8	11
2	11	12
14	29	30
18	34	35
\.


--
-- Data for Name: dueno; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.dueno (id, username, password, last_log, first_log) FROM stdin;
3	chucho	3333	2020-09-12	2010-01-01
6	cheo	6666	2020-09-12	2010-01-01
10	krystal	7777	2020-10-10	2019-01-16
4	papito	4444	2020-10-30	2010-01-01
18	risi-piston	9999	2020-11-01	2020-11-01
2	lola	2222	2020-11-29	2010-01-01
1	tito	1111	2020-11-29	2010-01-01
14	vito	8888	2020-12-05	2019-08-03
5	luis	5555	2020-12-06	2010-01-01
\.


--
-- Data for Name: nepe; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.nepe (id, nombre, revisado, media_video_url, media_social_handle, media_foto_url, que, donde, a_tu_casa, nombre_que_vector, donde_vector, cuando) FROM stdin;
8	enfermeria tasks by krystal	2020-10-10	https://www.youtube.com/embed/WepFJ8dnKeM	{"fbk":"","tt":"@krystal_enfermeria","igrm":"@kt_en_insta","phn":"787 826 4444"}	{8a,8b,8c}	{"poner inyecciones","pongo sueros","cuido ancianos"}	{moca,rincon,aguada}	f	'ancian':10 'by':3 'cuid':9 'enfermeri':1 'inyeccion':6 'krystal':4 'pon':5 'pong':7 'suer':8 'tasks':2	'aguada':3 'moca':1 'rincon':2	{"lun":"","mar":"","mier":"","jue":"","vier":"","sab":"sabado si","dom":"domingo tambien"}
5	papito lavando carros	2020-10-03	https://www.youtube.com/embed/L0eIqLvZlz8	{"fbk":"papito limpia carro","tt":"@papito-carwasher","igrm":"@papitoWasher_en_insta","phn":"787 249 4005"}	{5a.jpeg,5b.jpeg,5c.jpeg,5d.jpeg}	{"limpia carro","brilla carro","vaccum car cleaner","car detailing","lava carro"}	{yauco,"santa isabel","sabana grande"}	t	'brill':6 'car':9,11 'carr':3,5,7,14 'clean':10 'detailing':12 'lav':2,13 'limpi':4 'papit':1 'vaccum':8	'grande':5 'isabel':3 'sabana':4 'santa':2 'yauco':1	{"lun":"","mar":"","mier":"","jue":"","vier":"","sab":"hoy 30 oct 2020","dom":""}
1	barberia de tito	2019-08-19	https://www.youtube.com/embed/rWq_-AexyAo	{"fbk":"","tt":"@tito","igrm":"@tito_en_insta","phn":"787 222 0101"}	{1b.jpg,1a}	{peinador,peluquera,peinadora,"hair professional",estilista,barbero}	{moca,rincon,ponce,loiza}	t	'barber':10 'barberi':1 'estil':9 'hair':7 'peinador':4,6 'peluquer':5 'professional':8 'tit':3	'loiza':4 'moca':1 'ponce':3 'rincon':2	{"lun":"3pm a 8 pm","mar":"","mier":"","jue":"","vier":"todo el diA","sab":"","dom":""}
4	payasadas de papito el bello	2020-10-03	https://www.youtube.com/embed/AFoFxirvRKU	{"fbk":"papito el payaso","tt":"@papito-payaso","igrm":"@papitoPayaso_en_insta","phn":"787 248 4004"}	{4a.jpeg,4b.jpeg}	{musico,bailarin,orquesta,"entretenimiento actividades",payaso}	{moca,"san german",lares}	t	'activ':10 'bailarin':7 'bell':5 'entreten':9 'music':6 'orquest':8 'papit':3 'payas':1,11	'german':3 'lares':4 'moca':1 'san':2	{"lun":"","mar":"","mier":"","jue":"","vier":"","sab":"3 oct 2020","dom":""}
3	chucho landscaping	2019-08-03	https://www.youtube.com/embed/0Uk5kZ5k0vY	{"fbk":"chucho de jayuya","tt":"@granchucho","igrm":"","phn":"787 222 0003"}	{3a,3b.jpg}	{"pica grama","corta grama","tumba yerba","limpio patios","trimeo palos","hacemos patios","landscaping de patios"}	{moca,"las marias",mayaguez,caguas}	t	'chuch':1 'cort':5 'gram':4,6 'hac':13 'landscaping':2,15 'limpi':9 'pal':12 'pati':10,14,17 'pic':3 'trime':11 'tumb':7 'yerb':8	'caguas':5 'las':2 'marias':3 'mayaguez':4 'moca':1	{"lun":"","mar":"","mier":"despues de las 12","jue":"","vier":"","sab":"","dom":""}
34	Taller de Risi	2020-11-01	https://www.youtube.com/watch?v=xOOzmR30_YY	{"fbk":"face de luisa","tt":"","igrm":"","phn":"787 827 2396"}	{34a.jpeg}	{mecanico,"grasa man",transmisiones,"deja danao"}	{"las marias",lares,"san sebastian"}	f	'dana':9 'dej':8 'gras':5 'man':6 'mecan':4 'risi':3 'tall':1 'transmision':7	'lares':3 'las':1 'marias':2 'san':4 'sebastian':5	{"lun":"hasta las 5","mar":"","mier":"","jue":"","vier":"","sab":"cerrado : soy adventista","dom":""}
2	lola dona	2020-11-26	https://www.youtube.com/embed/4KjYNuNBOBg	{"fbk":"lola la comelola","tt":"","igrm":"@lola_en_insta","phn":"787 249 0202"}	{2a,2b.jpg}	{repostera,baker,panadera,dulces,postres,"tu bizcochito",pastelillos}	{ponce,coamo,"sabana grande",yauco,guanica}	f	'bak':4 'bizcochit':9 'don':2 'dulc':6 'lol':1 'panader':5 'pastelill':10 'postr':7 'reposter':3	'coamo':2 'grande':4 'guanica':6 'ponce':1 'sabana':3 'yauco':5	{"lun":"","mar":"no te cases","mier":"","jue":"","vier":"","sab":"los weekenes","dom":"los weekenes"}
11	Tutorias Lola	2020-11-29	https://www.youtube.com/watch?v=mlAGdR1scQs	{"fbk":"lolaEnFacebook","tt":"@lolaenTuiter","igrm":"@instagram_lola","phn":"826 4444"}	{11a.jpeg,11b.jpeg,11c.jpeg}	{"book reading tutos","leemos tu libros","estudio en grupo"}	{"la universidad","el colegio"}	f	'book':3 'estudi':9 'grup':11 'leem':6 'libr':8 'lol':2 'reading':4 'tut':5 'tutori':1	'colegio':4 'el':3 'la':1 'universidad':2	{"lun":"","mar":"","mier":"","jue":"no llueve hoy","vier":"","sab":"voy sabado","dom":"y voy domingo"}
29	delivery don vito	2020-12-05	youtu6	{"fbk":"","tt":"@yolollevo","igrm":"","phn":""}	{29a.jpeg,29b.jpeg}	{"yo te llevo la compra"}	{maricao,"san sebastian del pepino"}	t	'compr':8 'delivery':1 'don':2 'llev':6 'vit':3	'del':4 'maricao':1 'pepino':5 'san':2 'sebastian':3	{"lun":"","mar":"","mier":"","jue":"","vier":"","sab":"weekenes","dom":"weekenes"}
6	luis Y cheo foto shopeo	2020-12-06	https://www.youtube.com/embed/nSYT367zBUI	{"fbk":"cheo Y  luis foto shopeo","tt":"@luis-cheo","igrm":"@luis_cheo_en_insta","phn":"787 222 3264"}	{6a.jpeg}	{"profile picture photoshop","photoshop pictures","foto shopeo imagenes","caricaturas basada en foto","experto dibujo digital"}	{"new york",orlando,bayamon,kissimmee}	f	'bas':15 'caricatur':14 'che':3 'dibuj':19 'digital':20 'expert':18 'fot':4,11,17 'imagen':13 'luis':1 'photoshop':8,9 'pictur':7,10 'profil':6 'shope':5,12	'bayamon':4 'kissimmee':5 'new':1 'orlando':3 'york':2	{"lun":"","mar":"","mier":"","jue":"","vier":"","sab":"2pm - 1am","dom":"2pm - 1am"}
\.


--
-- Name: bregando_bregando_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.bregando_bregando_id_seq', 37, true);


--
-- Name: dueno_dueno_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.dueno_dueno_id_seq', 19, true);


--
-- Name: nepe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.nepe_id_seq', 36, true);


--
-- Name: bregando bregando_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.bregando
    ADD CONSTRAINT bregando_pkey PRIMARY KEY (id);


--
-- Name: dueno dueno_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno
    ADD CONSTRAINT dueno_pkey PRIMARY KEY (id);


--
-- Name: dueno dueno_username_key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno
    ADD CONSTRAINT dueno_username_key UNIQUE (username);


--
-- Name: nepe nepe_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe
    ADD CONSTRAINT nepe_pkey PRIMARY KEY (id);


--
-- Name: donde_vector_idx; Type: INDEX; Schema: public; Owner: victordbu
--

CREATE INDEX donde_vector_idx ON public.nepe USING gin (donde_vector);


--
-- Name: nombre_que_vector_idx; Type: INDEX; Schema: public; Owner: victordbu
--

CREATE INDEX nombre_que_vector_idx ON public.nepe USING gin (nombre_que_vector);


--
-- Name: bregando bregando_dueno_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.bregando
    ADD CONSTRAINT bregando_dueno_id_fkey FOREIGN KEY (dueno_id) REFERENCES public.dueno(id);


--
-- Name: bregando bregando_nepe_id; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.bregando
    ADD CONSTRAINT bregando_nepe_id FOREIGN KEY (nepe_id) REFERENCES public.nepe(id);


--
-- PostgreSQL database dump complete
--

