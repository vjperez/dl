--
-- PostgreSQL database dump
--

-- Dumped from database version 9.6.19
-- Dumped by pg_dump version 9.6.19

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

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: bregando; Type: TABLE; Schema: public; Owner: donlibre_victordbu
--

CREATE TABLE public.bregando (
    dueno_id integer NOT NULL,
    nepe_id integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.bregando OWNER TO donlibre_victordbu;

--
-- Name: bregando_id_seq; Type: SEQUENCE; Schema: public; Owner: donlibre_victordbu
--

CREATE SEQUENCE public.bregando_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bregando_id_seq OWNER TO donlibre_victordbu;

--
-- Name: bregando_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: donlibre_victordbu
--

ALTER SEQUENCE public.bregando_id_seq OWNED BY public.bregando.id;


--
-- Name: dueno; Type: TABLE; Schema: public; Owner: donlibre_victordbu
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


ALTER TABLE public.dueno OWNER TO donlibre_victordbu;

--
-- Name: dueno_id_seq; Type: SEQUENCE; Schema: public; Owner: donlibre_victordbu
--

CREATE SEQUENCE public.dueno_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dueno_id_seq OWNER TO donlibre_victordbu;

--
-- Name: dueno_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: donlibre_victordbu
--

ALTER SEQUENCE public.dueno_id_seq OWNED BY public.dueno.id;


--
-- Name: nepe; Type: TABLE; Schema: public; Owner: donlibre_victordbu
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


ALTER TABLE public.nepe OWNER TO donlibre_victordbu;

--
-- Name: nepe_id_seq; Type: SEQUENCE; Schema: public; Owner: donlibre_victordbu
--

CREATE SEQUENCE public.nepe_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nepe_id_seq OWNER TO donlibre_victordbu;

--
-- Name: nepe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: donlibre_victordbu
--

ALTER SEQUENCE public.nepe_id_seq OWNED BY public.nepe.id;


--
-- Name: bregando id; Type: DEFAULT; Schema: public; Owner: donlibre_victordbu
--

ALTER TABLE ONLY public.bregando ALTER COLUMN id SET DEFAULT nextval('public.bregando_id_seq'::regclass);


--
-- Name: dueno id; Type: DEFAULT; Schema: public; Owner: donlibre_victordbu
--

ALTER TABLE ONLY public.dueno ALTER COLUMN id SET DEFAULT nextval('public.dueno_id_seq'::regclass);


--
-- Name: nepe id; Type: DEFAULT; Schema: public; Owner: donlibre_victordbu
--

ALTER TABLE ONLY public.nepe ALTER COLUMN id SET DEFAULT nextval('public.nepe_id_seq'::regclass);


--
-- Data for Name: bregando; Type: TABLE DATA; Schema: public; Owner: donlibre_victordbu
--

COPY public.bregando (dueno_id, nepe_id, id) FROM stdin;
1024	1024	1024
1025	1025	1025
1028	1026	1026
1029	1027	1027
1030	1028	1028
1031	1029	1029
1031	1030	1030
1031	1031	1031
\.


--
-- Name: bregando_id_seq; Type: SEQUENCE SET; Schema: public; Owner: donlibre_victordbu
--

SELECT pg_catalog.setval('public.bregando_id_seq', 1031, true);


--
-- Data for Name: dueno; Type: TABLE DATA; Schema: public; Owner: donlibre_victordbu
--

COPY public.dueno (id, username, password, last_log, first_log) FROM stdin;
1025	lola	$2y$10$jULDL.Err5LLxEje3r6P3.hm4KHsE86I5Sj8RKtsdRvPa5K/tHntK	2021-01-18	2020-12-28
1028	hery	$2y$10$j0cqbVkXVjNuWBhKenrR.egcPchMsCcZmm64xqIdmqwdOHlHHSEam	2021-01-31	2021-01-17
1031	Confianzagroup	$2y$10$1CPaaE9Pncx.pfVytr/da.bATF9j0zIj9OeCMvW5AqI0CyEXXeF3S	2021-02-08	2021-02-08
1024	victor	$2y$10$lQXZ3nMwc0Yab83RCNsyvexCg5o.8K7.aEVvZWomo.p4WpmYoYGpu	2021-03-06	2020-12-27
1027	Manuela	$2y$10$Bu/KDaUcZf1QtoTotIytcOtQvcKpcX7CKZtAg5RmBWuGRM6QDxpoq	2020-12-30	2020-12-30
1029	cheo	$2y$10$KZjsMuRrg5dXftdJgaYoh.Q5KzQCTq7OvZ.kRQy4z26w.BkZpQ6aW	2021-01-17	2021-01-17
1030	wilmer	$2y$10$9Yrknx3d7meux7FibX9lguW18XEOKQDGaXFCehgt1rCkSUYlXJzHS	2021-01-17	2021-01-17
\.


--
-- Name: dueno_id_seq; Type: SEQUENCE SET; Schema: public; Owner: donlibre_victordbu
--

SELECT pg_catalog.setval('public.dueno_id_seq', 1031, true);


--
-- Data for Name: nepe; Type: TABLE DATA; Schema: public; Owner: donlibre_victordbu
--

COPY public.nepe (id, nombre, revisado, media_video_url, media_social_handle, media_foto_url, que, donde, a_tu_casa, nombre_que_vector, donde_vector, cuando) FROM stdin;
1028	wilmer trimmer	2021-01-17	https://youtu.be/okffA9LL5D4	{"fbk":"","tt":"@wilmer","igrm":"","phn":"787 010 0101"}	{1028a.jpeg,1028b.jpeg}	{landscaping,"patios design","mantenimiento areas verdes",podadora,gramas}	{bayamon,carolina,"san juan",guaynabo}	t	'are':7 'design':5 'gram':10 'landscaping':3 'manten':6 'pati':4 'podador':9 'trimm':2 'verd':8 'wilm':1	'bayamon':1 'carolina':2 'guaynabo':5 'juan':4 'san':3	{"lun":"hasta las 4pm","mar":"hasta las 4pm","mier":"hasta las 4pm","jue":"","vier":"","sab":"hasta las 4pm","dom":"hasta las 4pm"}
1025	lola dona	2021-01-17	https://www.youtube.com/watch?v=w6TxH8ha8XU	{"fbk":"lola_dona","tt":"@lola-dona","igrm":"@lola_en_insta","phn":"787 010 0101"}	{1025a.jpeg,1025b.jpeg,1025c.jpeg,1025d.jpeg,1025e.jpeg}	{donas,reposteria,postres,frapes,bizcochos,"entrega de donas","bizcochos de boda"}	{ponce,yauco,"santa isabel",coamo,guanica}	t	'bizcoch':7,11 'bod':13 'don':2,3,10 'entreg':8 'frap':6 'lol':1 'postr':5 'reposteri':4	'coamo':5 'guanica':6 'isabel':4 'ponce':1 'santa':3 'yauco':2	{"lun":"despues de las 12 medio dia","mar":"disponible por telefono","mier":"despues de las 12 medio dia","jue":"disponible por telefono","vier":"despues de las 12 medio dia","sab":"6am - 11am","dom":"7am - 1pm"}
1027	cheo - video - fotoshopeo	2021-01-17	https://youtu.be/fv814a-F-po	{"fbk":"cheo","tt":"@cheo","igrm":"@cheo_en_insta","phn":"787 010 0101"}	{1027a.jpeg,1027b.jpeg,1027c.jpeg,1027d.jpeg}	{"video editing","editor profesional de video","photoshop editing","social media picture editing","creo logo para social media"}	{"san juan",bayamon,guaynabo,carolina}	t	'che':1 'cre':16 'editing':5,11,15 'editor':6 'fotoshope':3 'log':17 'medi':13,20 'photoshop':10 'pictur':14 'profesional':7 'social':12,19 'vide':2,4,9	'bayamon':3 'carolina':5 'guaynabo':4 'juan':2 'san':1	{"lun":"preferiblemente libre - pero contactame","mar":"contactame","mier":"contactame","jue":"contactame","vier":"contactame","sab":"contactame","dom":"contactame"}
1030	Confianza group	2021-02-08	no video	{"fbk":"Confianzagroup","tt":"","igrm":"Confianzagrouo","phn":"7875871127"}	{1030a.jpeg}	{"Agencia de seguros","Planes m dicos","Polizas de cancer","Incapacidad accidente","Polizas de vida",Retiro,Anualidades}	{Facebook,Intagram,Oficinas,Mall}	t	'accident':13 'agenci':3 'anual':18 'canc':11 'confianz':1 'dic':8 'group':2 'incapac':12 'm':7 'plan':6 'poliz':9,14 'retir':17 'segur':5 'vid':16	'facebook':1 'intagram':2 'mall':4 'oficinas':3	{"lun":"8 a7","mar":"8a 7","mier":"8 a7","jue":"8 a 7","vier":"8 a7","sab":"8a7","dom":""}
1026	hery delivery	2021-01-31	no video	{"fbk":"","tt":"@hery","igrm":"@hery","phn":"787 010 0101"}	{1026a.png,1026b.jpeg,1026c.jpeg}	{"yo te llevo la compra","entrego pizza","te hago la compra","voy a centro comercial por ti","llevo y traigo tu antojo"}	{bayamon,guaynabo,"san juan",caguas}	t	'antoj':24 'centr':16 'comercial':17 'compr':7,13 'delivery':2 'entreg':8 'hag':11 'hery':1 'llev':5,20 'pizz':9 'traig':22 'voy':14	'bayamon':1 'caguas':5 'guaynabo':2 'juan':4 'san':3	{"lun":"6am a 6pm","mar":"","mier":"6am a 6pm","jue":"","vier":"6am a 11:30pm","sab":"6am a 11pm","dom":"6am a 6pm"}
1024	víctor web development	2021-02-20	https://www.youtube.com/watch?v=zuxzE7--RYM	{"fbk":"","tt":"","igrm":"","phn":"939 260 1734"}	{1024a.jpeg,1024b.jpeg}	{desarollo,"páginas web","web development","full stack web development"}	{"las marias puerto rico",mayagüéz}	t	'desaroll':4 'development':3,8,12 'full':9 'pagin':5 'stack':10 'victor':1 'web':2,6,7,11	'las':1 'marias':2 'mayaguez':5 'puerto':3 'rico':4	{"lun":"","mar":"2hrs y media","mier":"","jue":"2hrs y media","vier":"","sab":"5am - 10:30pm","dom":"5am - 10pm"}
1029	Confianza group	2021-02-08	no video	{"fbk":"Confianzagroup","tt":"","igrm":"Confianzagrouo","phn":"7875871127"}	{1029a.jpeg}	{"Agencia de seguros","Planes m dicos","Polizas de cancer","Incapacidad accidente","Polizas de vida",Retiro,Anualidades}	{Facebook,Intagram,Oficinas,Mall}	t	'accident':13 'agenci':3 'anual':18 'canc':11 'confianz':1 'dic':8 'group':2 'incapac':12 'm':7 'plan':6 'poliz':9,14 'retir':17 'segur':5 'vid':16	'facebook':1 'intagram':2 'mall':4 'oficinas':3	{"lun":"8 a7","mar":"8a 7","mier":"8 a7","jue":"8 a 7","vier":"8 a7","sab":"8a7","dom":""}
1031	Confianza group	2021-02-08	no video	{"fbk":"Confianzagroup","tt":"","igrm":"Confianzagrouo","phn":"7875871127"}	{1031a.jpeg}	{"Agencia de seguros","Planes m dicos","Polizas de cancer","Incapacidad accidente","Polizas de vida",Retiro,Anualidades}	{Facebook,Intagram,Oficinas,Mall}	t	'accident':13 'agenci':3 'anual':18 'canc':11 'confianz':1 'dic':8 'group':2 'incapac':12 'm':7 'plan':6 'poliz':9,14 'retir':17 'segur':5 'vid':16	'facebook':1 'intagram':2 'mall':4 'oficinas':3	{"lun":"8 a7","mar":"8a 7","mier":"8 a7","jue":"8 a 7","vier":"8 a7","sab":"8a7","dom":""}
\.


--
-- Name: nepe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: donlibre_victordbu
--

SELECT pg_catalog.setval('public.nepe_id_seq', 1031, true);


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys  FROM stdin;
\.


--
-- Name: bregando bregando_pkey; Type: CONSTRAINT; Schema: public; Owner: donlibre_victordbu
--

ALTER TABLE ONLY public.bregando
    ADD CONSTRAINT bregando_pkey PRIMARY KEY (id);


--
-- Name: dueno dueno_pkey; Type: CONSTRAINT; Schema: public; Owner: donlibre_victordbu
--

ALTER TABLE ONLY public.dueno
    ADD CONSTRAINT dueno_pkey PRIMARY KEY (id);


--
-- Name: dueno dueno_username_key; Type: CONSTRAINT; Schema: public; Owner: donlibre_victordbu
--

ALTER TABLE ONLY public.dueno
    ADD CONSTRAINT dueno_username_key UNIQUE (username);


--
-- Name: nepe nepe_pkey; Type: CONSTRAINT; Schema: public; Owner: donlibre_victordbu
--

ALTER TABLE ONLY public.nepe
    ADD CONSTRAINT nepe_pkey PRIMARY KEY (id);


--
-- Name: donde_vector_idx; Type: INDEX; Schema: public; Owner: donlibre_victordbu
--

CREATE INDEX donde_vector_idx ON public.nepe USING gin (donde_vector);


--
-- Name: nombre_que_vector_idx; Type: INDEX; Schema: public; Owner: donlibre_victordbu
--

CREATE INDEX nombre_que_vector_idx ON public.nepe USING gin (nombre_que_vector);


--
-- Name: bregando bregando_dueno_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: donlibre_victordbu
--

ALTER TABLE ONLY public.bregando
    ADD CONSTRAINT bregando_dueno_id_fkey FOREIGN KEY (dueno_id) REFERENCES public.dueno(id);


--
-- Name: bregando bregando_nepe_id; Type: FK CONSTRAINT; Schema: public; Owner: donlibre_victordbu
--

ALTER TABLE ONLY public.bregando
    ADD CONSTRAINT bregando_nepe_id FOREIGN KEY (nepe_id) REFERENCES public.nepe(id);


--
-- Name: TABLE bregando; Type: ACL; Schema: public; Owner: donlibre_victordbu
--

GRANT ALL ON TABLE public.bregando TO donlibre_nepeype;


--
-- Name: TABLE dueno; Type: ACL; Schema: public; Owner: donlibre_victordbu
--

GRANT ALL ON TABLE public.dueno TO donlibre_nepeype;


--
-- Name: TABLE nepe; Type: ACL; Schema: public; Owner: donlibre_victordbu
--

GRANT ALL ON TABLE public.nepe TO donlibre_nepeype;


--
-- PostgreSQL database dump complete
--

