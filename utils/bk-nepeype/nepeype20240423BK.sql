-- is there colllation version mismatch?
-- ALTER DATABASE  LKJHLKJ  REFRESH COLLATION VERSION

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

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

--
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: donde; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.donde (
    id bigint NOT NULL,
    frase character varying(64) NOT NULL,
    donde_vector tsvector GENERATED ALWAYS AS (to_tsvector('spanish'::regconfig, (frase)::text)) STORED
);


ALTER TABLE public.donde OWNER TO victordbu;

--
-- Name: donde_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.donde_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.donde_id_seq OWNER TO victordbu;

--
-- Name: donde_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.donde_id_seq OWNED BY public.donde.id;


--
-- Name: dueno; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.dueno (
    id integer NOT NULL,
    nombre character varying(64) NOT NULL,
    clave character varying(64) NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    last_log date DEFAULT '2010-01-01'::date NOT NULL,
    first_log date DEFAULT '2010-01-01'::date NOT NULL,
    CONSTRAINT dueno_first_log_check CHECK ((first_log > '2019-12-31'::date)),
    CONSTRAINT dueno_last_log_check CHECK ((last_log > '2019-12-31'::date))
);


ALTER TABLE public.dueno OWNER TO victordbu;

--
-- Name: dueno_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.dueno_id_seq
    AS integer
    START WITH -2147483648
    INCREMENT BY 1
    MINVALUE -2147483648
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dueno_id_seq OWNER TO victordbu;

--
-- Name: dueno_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.dueno_id_seq OWNED BY public.dueno.id;


--
-- Name: dueno_nepe; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.dueno_nepe (
    id bigint NOT NULL,
    dueno_id integer NOT NULL,
    nepe_id integer NOT NULL,
    creado date DEFAULT '2010-01-01'::date NOT NULL,
    vence date DEFAULT '2010-01-01'::date NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    CONSTRAINT dueno_nepe_creado_check CHECK ((creado > '2019-12-31'::date)),
    CONSTRAINT dueno_nepe_vence_check CHECK ((vence > '2019-12-31'::date))
);


ALTER TABLE public.dueno_nepe OWNER TO victordbu;

--
-- Name: dueno_nepe_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.dueno_nepe_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dueno_nepe_id_seq OWNER TO victordbu;

--
-- Name: dueno_nepe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.dueno_nepe_id_seq OWNED BY public.dueno_nepe.id;


--
-- Name: foto; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.foto (
    id bigint NOT NULL,
    nepe_id integer NOT NULL,
    urls text[] NOT NULL,
    prox_indice smallint DEFAULT 0 NOT NULL,
    creado date DEFAULT '2010-01-01'::date NOT NULL,
    revisado date DEFAULT '2010-01-01'::date NOT NULL,
    hits bigint DEFAULT 0 NOT NULL,
    CONSTRAINT foto_creado_check CHECK ((creado > '2019-12-31'::date)),
    CONSTRAINT foto_revisado_check CHECK ((revisado > '2019-12-31'::date))
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


ALTER SEQUENCE public.foto_id_seq OWNER TO victordbu;

--
-- Name: foto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.foto_id_seq OWNED BY public.foto.id;


--
-- Name: nepe; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.nepe (
    id integer NOT NULL,
    nombre character varying(64) NOT NULL,
    cuando json NOT NULL,
    su_casa boolean DEFAULT false,
    desde_casa boolean DEFAULT false,
    creado date DEFAULT '2010-01-01'::date NOT NULL,
    revisado date DEFAULT '2010-01-01'::date NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    nombre_vector tsvector GENERATED ALWAYS AS (to_tsvector('spanish'::regconfig, (nombre)::text)) STORED,
    CONSTRAINT nepe_creado_check CHECK ((creado > '2019-12-31'::date)),
    CONSTRAINT nepe_revisado_check CHECK ((revisado > '2019-12-31'::date))
);


ALTER TABLE public.nepe OWNER TO victordbu;

--
-- Name: nepe_donde; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.nepe_donde (
    id bigint NOT NULL,
    nepe_id integer NOT NULL,
    donde_id bigint NOT NULL,
    creado date DEFAULT '2010-01-01'::date NOT NULL,
    hits bigint DEFAULT 0 NOT NULL,
    CONSTRAINT nepe_donde_creado_check CHECK ((creado > '2019-12-31'::date))
);


ALTER TABLE public.nepe_donde OWNER TO victordbu;

--
-- Name: nepe_donde_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.nepe_donde_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nepe_donde_id_seq OWNER TO victordbu;

--
-- Name: nepe_donde_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.nepe_donde_id_seq OWNED BY public.nepe_donde.id;


--
-- Name: nepe_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.nepe_id_seq
    AS integer
    START WITH -2147483648
    INCREMENT BY 1
    MINVALUE -2147483648
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nepe_id_seq OWNER TO victordbu;

--
-- Name: nepe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.nepe_id_seq OWNED BY public.nepe.id;


--
-- Name: nepe_que; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.nepe_que (
    id bigint NOT NULL,
    nepe_id integer NOT NULL,
    que_id bigint NOT NULL,
    creado date DEFAULT '2010-01-01'::date NOT NULL,
    hits bigint DEFAULT 0 NOT NULL,
    CONSTRAINT nepe_que_creado_check CHECK ((creado > '2019-12-31'::date))
);


ALTER TABLE public.nepe_que OWNER TO victordbu;

--
-- Name: nepe_que_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.nepe_que_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nepe_que_id_seq OWNER TO victordbu;

--
-- Name: nepe_que_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.nepe_que_id_seq OWNED BY public.nepe_que.id;


--
-- Name: que; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.que (
    id bigint NOT NULL,
    frase character varying(64) NOT NULL,
    que_vector tsvector GENERATED ALWAYS AS (to_tsvector('spanish'::regconfig, (frase)::text)) STORED
);


ALTER TABLE public.que OWNER TO victordbu;

--
-- Name: que_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.que_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.que_id_seq OWNER TO victordbu;

--
-- Name: que_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.que_id_seq OWNED BY public.que.id;


--
-- Name: social; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.social (
    id integer NOT NULL,
    contactos text[] NOT NULL,
    dueno_id integer NOT NULL
);


ALTER TABLE public.social OWNER TO victordbu;

--
-- Name: social_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.social_id_seq
    AS integer
    START WITH -2147483648
    INCREMENT BY 1
    MINVALUE -2147483648
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.social_id_seq OWNER TO victordbu;

--
-- Name: social_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.social_id_seq OWNED BY public.social.id;


--
-- Name: video; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.video (
    id bigint NOT NULL,
    url character varying(64) NOT NULL,
    nepe_id integer NOT NULL,
    creado date DEFAULT '2010-01-01'::date NOT NULL,
    revisado date DEFAULT '2010-01-01'::date NOT NULL,
    hits bigint DEFAULT 0 NOT NULL,
    CONSTRAINT video_creado_check CHECK ((creado > '2019-12-31'::date)),
    CONSTRAINT video_revisado_check CHECK ((revisado > '2019-12-31'::date))
);


ALTER TABLE public.video OWNER TO victordbu;

--
-- Name: video_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.video_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.video_id_seq OWNER TO victordbu;

--
-- Name: video_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.video_id_seq OWNED BY public.video.id;


--
-- Name: donde id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.donde ALTER COLUMN id SET DEFAULT nextval('public.donde_id_seq'::regclass);


--
-- Name: dueno id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno ALTER COLUMN id SET DEFAULT nextval('public.dueno_id_seq'::regclass);


--
-- Name: dueno_nepe id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno_nepe ALTER COLUMN id SET DEFAULT nextval('public.dueno_nepe_id_seq'::regclass);


--
-- Name: foto id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.foto ALTER COLUMN id SET DEFAULT nextval('public.foto_id_seq'::regclass);


--
-- Name: nepe id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe ALTER COLUMN id SET DEFAULT nextval('public.nepe_id_seq'::regclass);


--
-- Name: nepe_donde id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_donde ALTER COLUMN id SET DEFAULT nextval('public.nepe_donde_id_seq'::regclass);


--
-- Name: nepe_que id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_que ALTER COLUMN id SET DEFAULT nextval('public.nepe_que_id_seq'::regclass);


--
-- Name: que id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.que ALTER COLUMN id SET DEFAULT nextval('public.que_id_seq'::regclass);


--
-- Name: social id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.social ALTER COLUMN id SET DEFAULT nextval('public.social_id_seq'::regclass);


--
-- Name: video id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.video ALTER COLUMN id SET DEFAULT nextval('public.video_id_seq'::regclass);


--
-- Data for Name: donde; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.donde (id, frase) FROM stdin;
19	santiago
24	ponce
25	montevideo
26	país
27	moca
\.


--
-- Data for Name: dueno; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.dueno (id, nombre, clave, activo, last_log, first_log) FROM stdin;
1024	victor	$2y$10$iU29bhi4vBGw6qYBTvuG9.txjSTuwPkrSzi9ESmQPd1Tp4C1z8MfG	t	2024-04-16	2021-10-24
-2147483648	rosa	$2y$10$/vqYIPvOxCP/pELsavyPbu2nJEvik.xSvNLb8YG6vJxS/hJD5zQF.	t	2024-04-16	2024-03-20
\.


--
-- Data for Name: dueno_nepe; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.dueno_nepe (id, dueno_id, nepe_id, creado, vence, activo) FROM stdin;
1	1024	-2147483648	2024-03-17	2025-03-17	t
2	-2147483648	-2147483647	2024-03-20	2025-03-20	t
3	-2147483648	-2147483646	2024-04-15	2025-04-15	t
\.


--
-- Data for Name: foto; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.foto (id, nepe_id, urls, prox_indice, creado, revisado, hits) FROM stdin;
5	-2147483648	{a.jpeg,b.jpeg,c.jpeg,d.jpeg,e.jpeg}	5	2024-03-30	2024-03-30	0
6	-2147483646	{a.jpeg}	1	2024-04-15	2024-04-15	0
\.


--
-- Data for Name: nepe; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.nepe (id, nombre, cuando, su_casa, desde_casa, creado, revisado, activo) FROM stdin;
-2147483648	vito	{"lun":"","mar":"","mie":"12:28 pm 2024 03 20","jue":"","vie":"5:06 pm santo","sab":"6:12 pm santo","dom":""}	\N	t	2024-03-18	2024-03-30	t
-2147483646	rosa h.	{"lun":"lunes 5 : 03pm - 5:13pm","mar":"","mie":"","jue":"","vie":"","sab":"","dom":""}	t	t	2024-04-15	2024-04-15	t
-2147483647	rosin	{"lun":"","mar":"","mie":"por la tarde, 2:46 pm","jue":"","vie":"","sab":"6:18 pm santo","dom":""}	f	\N	2024-03-20	2024-04-16	t
\.


--
-- Data for Name: nepe_donde; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.nepe_donde (id, nepe_id, donde_id, creado, hits) FROM stdin;
18	-2147483648	19	2024-03-20	0
24	-2147483647	24	2024-03-27	0
25	-2147483648	25	2024-03-29	0
26	-2147483647	26	2024-03-30	0
27	-2147483646	27	2024-04-15	0
28	-2147483646	24	2024-04-15	0
\.


--
-- Data for Name: nepe_que; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.nepe_que (id, nepe_id, que_id, creado, hits) FROM stdin;
27	-2147483648	31	2024-03-20	0
33	-2147483647	36	2024-03-27	0
35	-2147483648	38	2024-03-30	0
36	-2147483646	39	2024-04-15	0
37	-2147483646	40	2024-04-15	0
\.


--
-- Data for Name: que; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.que (id, frase) FROM stdin;
31	codeador con ai
36	cocino piononos
38	cibernético
39	cocina mofongo
40	entrega pionona
\.


--
-- Data for Name: social; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.social (id, contactos, dueno_id) FROM stdin;
-2147483639	{787-122-1212,vijapefi@gmail.com,"pepo @ insta","vito @ real"}	1024
-2147483640	{787-249-1819,rosa@amfenol.com,"@totin en tiktok","@rosita en face bu"}	-2147483648
\.


--
-- Data for Name: video; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.video (id, url, nepe_id, creado, revisado, hits) FROM stdin;
1	lk & &kj	-2147483648	2024-03-18	2024-03-30	0
9	nada	-2147483646	2024-04-15	2024-04-15	0
2	ro_ _sa	-2147483647	2024-03-20	2024-04-16	0
\.


--
-- Name: donde_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.donde_id_seq', 27, true);


--
-- Name: dueno_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.dueno_id_seq', -2147483648, true);


--
-- Name: dueno_nepe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.dueno_nepe_id_seq', 3, true);


--
-- Name: foto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.foto_id_seq', 6, true);


--
-- Name: nepe_donde_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.nepe_donde_id_seq', 28, true);


--
-- Name: nepe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.nepe_id_seq', -2147483646, true);


--
-- Name: nepe_que_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.nepe_que_id_seq', 37, true);


--
-- Name: que_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.que_id_seq', 40, true);


--
-- Name: social_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.social_id_seq', -2147483639, true);


--
-- Name: video_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.video_id_seq', 9, true);


--
-- Name: donde donde_frase_key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.donde
    ADD CONSTRAINT donde_frase_key UNIQUE (frase);


--
-- Name: donde donde_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.donde
    ADD CONSTRAINT donde_pkey PRIMARY KEY (id);


--
-- Name: dueno_nepe dueno_nepe-key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno_nepe
    ADD CONSTRAINT "dueno_nepe-key" UNIQUE (nepe_id, dueno_id);


--
-- Name: dueno_nepe dueno_nepe_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno_nepe
    ADD CONSTRAINT dueno_nepe_pkey PRIMARY KEY (id);


--
-- Name: dueno dueno_nombre_key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno
    ADD CONSTRAINT dueno_nombre_key UNIQUE (nombre);


--
-- Name: dueno dueno_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno
    ADD CONSTRAINT dueno_pkey PRIMARY KEY (id);


--
-- Name: foto foto_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.foto
    ADD CONSTRAINT foto_pkey PRIMARY KEY (id);


--
-- Name: nepe_donde nepe_donde-key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_donde
    ADD CONSTRAINT "nepe_donde-key" UNIQUE (nepe_id, donde_id);


--
-- Name: nepe_donde nepe_donde_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_donde
    ADD CONSTRAINT nepe_donde_pkey PRIMARY KEY (id);


--
-- Name: nepe nepe_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe
    ADD CONSTRAINT nepe_pkey PRIMARY KEY (id);


--
-- Name: nepe_que nepe_que-key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_que
    ADD CONSTRAINT "nepe_que-key" UNIQUE (nepe_id, que_id);


--
-- Name: nepe_que nepe_que_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_que
    ADD CONSTRAINT nepe_que_pkey PRIMARY KEY (id);


--
-- Name: que que_frase_key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.que
    ADD CONSTRAINT que_frase_key UNIQUE (frase);


--
-- Name: que que_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.que
    ADD CONSTRAINT que_pkey PRIMARY KEY (id);


--
-- Name: social social_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.social
    ADD CONSTRAINT social_pkey PRIMARY KEY (id);


--
-- Name: video video_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.video
    ADD CONSTRAINT video_pkey PRIMARY KEY (id);


--
-- Name: video video_url_key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.video
    ADD CONSTRAINT video_url_key UNIQUE (url);


--
-- Name: dueno_nepe dueno_nepe-dueno_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno_nepe
    ADD CONSTRAINT "dueno_nepe-dueno_id-Fkey" FOREIGN KEY (dueno_id) REFERENCES public.dueno(id) ON DELETE CASCADE;


--
-- Name: dueno_nepe dueno_nepe-nepe_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno_nepe
    ADD CONSTRAINT "dueno_nepe-nepe_id-Fkey" FOREIGN KEY (nepe_id) REFERENCES public.nepe(id) ON DELETE CASCADE;


--
-- Name: foto foto-nepe_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.foto
    ADD CONSTRAINT "foto-nepe_id-Fkey" FOREIGN KEY (nepe_id) REFERENCES public.nepe(id) ON DELETE CASCADE;


--
-- Name: nepe_donde nepe_donde-donde_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_donde
    ADD CONSTRAINT "nepe_donde-donde_id-Fkey" FOREIGN KEY (donde_id) REFERENCES public.donde(id) ON DELETE CASCADE;


--
-- Name: nepe_donde nepe_donde-nepe_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_donde
    ADD CONSTRAINT "nepe_donde-nepe_id-Fkey" FOREIGN KEY (nepe_id) REFERENCES public.nepe(id) ON DELETE CASCADE;


--
-- Name: nepe_que nepe_que-nepe_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_que
    ADD CONSTRAINT "nepe_que-nepe_id-Fkey" FOREIGN KEY (nepe_id) REFERENCES public.nepe(id) ON DELETE CASCADE;


--
-- Name: nepe_que nepe_que-que_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_que
    ADD CONSTRAINT "nepe_que-que_id-Fkey" FOREIGN KEY (que_id) REFERENCES public.que(id) ON DELETE CASCADE;


--
-- Name: social social-dueno_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.social
    ADD CONSTRAINT "social-dueno_id-Fkey" FOREIGN KEY (dueno_id) REFERENCES public.dueno(id) ON DELETE CASCADE;


--
-- Name: video video-nepe_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.video
    ADD CONSTRAINT "video-nepe_id-Fkey" FOREIGN KEY (nepe_id) REFERENCES public.nepe(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

