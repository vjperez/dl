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
\.


--
-- Data for Name: dueno; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.dueno (id, username, password, last_log, first_log) FROM stdin;
1	tito	1111	2020-09-12	2010-01-01
3	chucho	3333	2020-09-12	2010-01-01
4	papito	4444	2020-09-12	2010-01-01
5	luis	5555	2020-09-12	2010-01-01
6	cheo	6666	2020-09-12	2010-01-01
10	krystal	7777	2020-09-20	2019-01-16
14	vito	8888	2020-09-26	2019-08-03
2	lola	2222	2020-09-26	2010-01-01
\.


--
-- Data for Name: nepe; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.nepe (id, nombre, revisado, media_video_url, media_social_handle, media_foto_url, que, donde, a_tu_casa, nombre_que_vector, donde_vector, cuando) FROM stdin;
8	enfermeria tasks by krystal	2019-03-27	https://www.youtube.com/embed/WepFJ8dnKeM	{"fbk":"","tt":"@krystal_enfermeria","igrm":"@kt_en_insta","phn":"787 826 4444"}	{8a,8b,8c}	{"poner inyecciones","pongo sueros","cuido ancianos"}	{moca,rincon,aguada}	f	'ancian':10 'by':3 'cuid':9 'enfermeri':1 'inyeccion':6 'krystal':4 'pon':5 'pong':7 'suer':8 'tasks':2	'aguada':3 'moca':1 'rincon':2	{"lun":"", "mar":"", "mier":"", "jue":"", "vier":"", "sab":"", "dom":""}
5	papito lavando	2010-01-01	https://www.youtube.com/embed/L0eIqLvZlz8	{"tt":"@papito-carwasher", "fbk":"papito limpia carro", "igrm":"@papitoWasher_en_insta", "phn":"787 249 4005"}	{5a.jpg}	{"limpia carro","brilla carro","vaccum car cleaner","car detailing","lava carro"}	{yauco,"santa isabel","sabana grande"}	t	'brill':5 'car':8,10 'carr':4,6,13 'clean':9 'detailing':11 'lav':2,12 'limpi':3 'papit':1 'vaccum':7	'grande':5 'isabel':3 'sabana':4 'santa':2 'yauco':1	{"lun":"", "mar":"", "mier":"", "jue":"", "vier":"", "sab":"", "dom":""}
4	papito payaseando	2010-01-01	https://www.youtube.com/embed/AFoFxirvRKU	{"tt":"@papito-payaso", "fbk":"papito el payaso", "igrm":"@papitoPayaso_en_insta", "phn":"787 248 4004"}	{4a.jpg,4b.jpg,4c.jpg,4d.jpg}	{musico,bailarin,orquesta,"entretenimiento actividades",payaso}	{moca,"san german",lares}	t	'activ':7 'bailarin':4 'entreten':6 'music':3 'orquest':5 'papit':1 'payas':2,8	'german':3 'lares':4 'moca':1 'san':2	{"lun":"", "mar":"", "mier":"", "jue":"", "vier":"", "sab":"", "dom":""}
6	luis y cheo foto shopeo	2019-02-12	https://www.youtube.com/embed/nSYT367zBUI	{"fbk":"cheo luis foto shopeo","tt":"@luis-cheo","igrm":"@luis_cheo_en_insta","phn":"787 222 5606"}	{6a.jpg,6b.jpg}	{"profile picture photoshop","photoshop pictures","foto shopeo imagenes","caricaturas basada en foto","experto dibujo digital"}	{"new york",orlando,bayamon}	f	'bas':15 'caricatur':14 'che':3 'dibuj':19 'digital':20 'expert':18 'fot':4,11,17 'imagen':13 'luis':1 'photoshop':8,9 'pictur':7,10 'profil':6 'shope':5,12	'bayamon':4 'new':1 'orlando':3 'york':2	{"lun":"", "mar":"", "mier":"", "jue":"", "vier":"", "sab":"", "dom":""}
1	barberia de tito	2019-08-19	https://www.youtube.com/embed/rWq_-AexyAo	{"fbk":"","tt":"@tito","igrm":"@tito_en_insta","phn":"787 222 0101"}	{1b.jpg,1a}	{peinador,peluquera,peinadora,"hair professional",estilista,barbero}	{moca,rincon,ponce,loiza}	t	'barber':10 'barberi':1 'estil':9 'hair':7 'peinador':4,6 'peluquer':5 'professional':8 'tit':3	'loiza':4 'moca':1 'ponce':3 'rincon':2	{"lun":"3pm a 8 pm","mar":"","mier":"","jue":"","vier":"todo el diA","sab":"","dom":""}
29	vito delivers	2020-09-20	https://www.youtube.com/watch?v=f904jqpMvJU	{"fbk":"","tt":"@yolollevo","igrm":"","phn":""}	{29a.jpeg,29b.png}	{"yo te llevo la compra"}	{"las marias",maricao,"san sebastian"}	t	'compr':7 'delivers':2 'llev':5 'vit':1	'las':1 'marias':2 'maricao':3 'san':4 'sebastian':5	{"lun":"","mar":"","mier":"","jue":"","vier":"","sab":"weekenes","dom":"weekenes"}
3	chucho landscaping	2019-08-03	https://www.youtube.com/embed/0Uk5kZ5k0vY	{"fbk":"chucho de jayuya","tt":"@granchucho","igrm":"","phn":"787 222 0003"}	{3a,3b.jpg}	{"pica grama","corta grama","tumba yerba","limpio patios","trimeo palos","hacemos patios","landscaping de patios"}	{moca,"las marias",mayaguez,caguas}	t	'chuch':1 'cort':5 'gram':4,6 'hac':13 'landscaping':2,15 'limpi':9 'pal':12 'pati':10,14,17 'pic':3 'trime':11 'tumb':7 'yerb':8	'caguas':5 'las':2 'marias':3 'mayaguez':4 'moca':1	{"lun":"","mar":"","mier":"despues de las 12","jue":"","vier":"","sab":"","dom":""}
11	otro nepe de lola	2019-08-03	link	{"fbk":"fase bu de lola","tt":"","igrm":"","phn":""}	{11a.jpg,11b.jpg}	{"que uno","leemos tu libros"}	{"donde primero","el colegio"}	f	'leem':7 'libr':9 'lol':4 'nep':2	'colegio':4 'donde':1 'el':3 'primero':2	{"lun":"","mar":"","mier":"","jue":"llueve hoy","vier":"","sab":"","dom":""}
2	las donas de la lola	2019-08-03	https://www.youtube.com/embed/4KjYNuNBOBg	{"fbk":"lola la comelola","tt":"","igrm":"@lola_en_insta","phn":"787 249 0202"}	{2a,2b.jpg}	{repostera,baker,panadera,dulces,postres,"tu bizcochito",pastelillos}	{ponce,coamo,"sabana grande",yauco,guanica}	f	'bak':7 'bizcochit':12 'don':2 'dulc':9 'lol':5 'panader':8 'pastelill':13 'postr':10 'reposter':6	'coamo':2 'grande':4 'guanica':6 'ponce':1 'sabana':3 'yauco':5	{"lun":"","mar":"no te cases","mier":"","jue":"","vier":"","sab":"los weekenes","dom":"los weekenes"}
\.


--
-- Name: bregando_bregando_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.bregando_bregando_id_seq', 33, true);


--
-- Name: dueno_dueno_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.dueno_dueno_id_seq', 14, true);


--
-- Name: nepe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.nepe_id_seq', 32, true);


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

