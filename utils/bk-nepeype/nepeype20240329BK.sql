--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2024-03-29 17:31:26

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
-- TOC entry 2 (class 3079 OID 25936)
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- TOC entry 3482 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 17929)
-- Name: donde; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.donde (
    id bigint NOT NULL,
    frase character varying(64) NOT NULL,
    donde_vector tsvector GENERATED ALWAYS AS (to_tsvector('spanish'::regconfig, (frase)::text)) STORED
);


ALTER TABLE public.donde OWNER TO victordbu;

--
-- TOC entry 216 (class 1259 OID 17935)
-- Name: donde_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.donde_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.donde_id_seq OWNER TO victordbu;

--
-- TOC entry 3483 (class 0 OID 0)
-- Dependencies: 216
-- Name: donde_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.donde_id_seq OWNED BY public.donde.id;


--
-- TOC entry 217 (class 1259 OID 17936)
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
-- TOC entry 218 (class 1259 OID 17944)
-- Name: dueno_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.dueno_id_seq
    AS integer
    START WITH -2147483648
    INCREMENT BY 1
    MINVALUE -2147483648
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dueno_id_seq OWNER TO victordbu;

--
-- TOC entry 3484 (class 0 OID 0)
-- Dependencies: 218
-- Name: dueno_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.dueno_id_seq OWNED BY public.dueno.id;


--
-- TOC entry 219 (class 1259 OID 17945)
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
-- TOC entry 220 (class 1259 OID 17953)
-- Name: dueno_nepe_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.dueno_nepe_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dueno_nepe_id_seq OWNER TO victordbu;

--
-- TOC entry 3485 (class 0 OID 0)
-- Dependencies: 220
-- Name: dueno_nepe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.dueno_nepe_id_seq OWNED BY public.dueno_nepe.id;


--
-- TOC entry 221 (class 1259 OID 17954)
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
-- TOC entry 222 (class 1259 OID 17965)
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
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 222
-- Name: foto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.foto_id_seq OWNED BY public.foto.id;


--
-- TOC entry 223 (class 1259 OID 17966)
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
-- TOC entry 224 (class 1259 OID 17979)
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
-- TOC entry 225 (class 1259 OID 17985)
-- Name: nepe_donde_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.nepe_donde_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nepe_donde_id_seq OWNER TO victordbu;

--
-- TOC entry 3487 (class 0 OID 0)
-- Dependencies: 225
-- Name: nepe_donde_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.nepe_donde_id_seq OWNED BY public.nepe_donde.id;


--
-- TOC entry 226 (class 1259 OID 17986)
-- Name: nepe_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.nepe_id_seq
    AS integer
    START WITH -2147483648
    INCREMENT BY 1
    MINVALUE -2147483648
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nepe_id_seq OWNER TO victordbu;

--
-- TOC entry 3488 (class 0 OID 0)
-- Dependencies: 226
-- Name: nepe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.nepe_id_seq OWNED BY public.nepe.id;


--
-- TOC entry 227 (class 1259 OID 17987)
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
-- TOC entry 228 (class 1259 OID 17993)
-- Name: nepe_que_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.nepe_que_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.nepe_que_id_seq OWNER TO victordbu;

--
-- TOC entry 3489 (class 0 OID 0)
-- Dependencies: 228
-- Name: nepe_que_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.nepe_que_id_seq OWNED BY public.nepe_que.id;


--
-- TOC entry 229 (class 1259 OID 17994)
-- Name: que; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.que (
    id bigint NOT NULL,
    frase character varying(64) NOT NULL,
    que_vector tsvector GENERATED ALWAYS AS (to_tsvector('spanish'::regconfig, (frase)::text)) STORED
);


ALTER TABLE public.que OWNER TO victordbu;

--
-- TOC entry 230 (class 1259 OID 18000)
-- Name: que_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.que_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.que_id_seq OWNER TO victordbu;

--
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 230
-- Name: que_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.que_id_seq OWNED BY public.que.id;


--
-- TOC entry 231 (class 1259 OID 18001)
-- Name: social; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.social (
    id integer NOT NULL,
    handle character varying(64) NOT NULL,
    tipo character varying(64) NOT NULL,
    dueno_id integer NOT NULL
);


ALTER TABLE public.social OWNER TO victordbu;

--
-- TOC entry 232 (class 1259 OID 18004)
-- Name: social_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.social_id_seq
    AS integer
    START WITH -2147483648
    INCREMENT BY 1
    MINVALUE -2147483648
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.social_id_seq OWNER TO victordbu;

--
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 232
-- Name: social_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.social_id_seq OWNED BY public.social.id;


--
-- TOC entry 233 (class 1259 OID 18005)
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
-- TOC entry 234 (class 1259 OID 18013)
-- Name: video_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.video_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.video_id_seq OWNER TO victordbu;

--
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 234
-- Name: video_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.video_id_seq OWNED BY public.video.id;


--
-- TOC entry 3225 (class 2604 OID 18014)
-- Name: donde id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.donde ALTER COLUMN id SET DEFAULT nextval('public.donde_id_seq'::regclass);


--
-- TOC entry 3227 (class 2604 OID 18015)
-- Name: dueno id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno ALTER COLUMN id SET DEFAULT nextval('public.dueno_id_seq'::regclass);


--
-- TOC entry 3231 (class 2604 OID 18016)
-- Name: dueno_nepe id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno_nepe ALTER COLUMN id SET DEFAULT nextval('public.dueno_nepe_id_seq'::regclass);


--
-- TOC entry 3235 (class 2604 OID 18017)
-- Name: foto id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.foto ALTER COLUMN id SET DEFAULT nextval('public.foto_id_seq'::regclass);


--
-- TOC entry 3240 (class 2604 OID 18018)
-- Name: nepe id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe ALTER COLUMN id SET DEFAULT nextval('public.nepe_id_seq'::regclass);


--
-- TOC entry 3247 (class 2604 OID 18019)
-- Name: nepe_donde id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_donde ALTER COLUMN id SET DEFAULT nextval('public.nepe_donde_id_seq'::regclass);


--
-- TOC entry 3250 (class 2604 OID 18020)
-- Name: nepe_que id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_que ALTER COLUMN id SET DEFAULT nextval('public.nepe_que_id_seq'::regclass);


--
-- TOC entry 3253 (class 2604 OID 18021)
-- Name: que id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.que ALTER COLUMN id SET DEFAULT nextval('public.que_id_seq'::regclass);


--
-- TOC entry 3255 (class 2604 OID 18022)
-- Name: social id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.social ALTER COLUMN id SET DEFAULT nextval('public.social_id_seq'::regclass);


--
-- TOC entry 3256 (class 2604 OID 18023)
-- Name: video id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.video ALTER COLUMN id SET DEFAULT nextval('public.video_id_seq'::regclass);


--
-- TOC entry 3457 (class 0 OID 17929)
-- Dependencies: 215
-- Data for Name: donde; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.donde (id, frase) FROM stdin;
19	santiago
24	ponce
25	montevideo
\.


--
-- TOC entry 3459 (class 0 OID 17936)
-- Dependencies: 217
-- Data for Name: dueno; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.dueno (id, nombre, clave, activo, last_log, first_log) FROM stdin;
-2147483648	rosa	$2y$10$3yvM/L9EPfnZxYZe9E7due.C1N6Oydb3JeSNITEJOiZGNHmervzO2	t	2024-03-27	2024-03-20
1024	victor	$2y$10$iU29bhi4vBGw6qYBTvuG9.txjSTuwPkrSzi9ESmQPd1Tp4C1z8MfG	t	2024-03-29	2021-10-24
\.


--
-- TOC entry 3461 (class 0 OID 17945)
-- Dependencies: 219
-- Data for Name: dueno_nepe; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.dueno_nepe (id, dueno_id, nepe_id, creado, vence, activo) FROM stdin;
1	1024	-2147483648	2024-03-17	2025-03-17	t
2	-2147483648	-2147483647	2024-03-20	2025-03-20	t
\.


--
-- TOC entry 3463 (class 0 OID 17954)
-- Dependencies: 221
-- Data for Name: foto; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.foto (id, nepe_id, urls, prox_indice, creado, revisado, hits) FROM stdin;
4	-2147483648	{-2147483648a.jpeg,-2147483648b.jpeg,-2147483648c.jpeg,-2147483648d.jpeg,-2147483648e.jpeg,-2147483648f.jpeg,-2147483648g.jpeg,-2147483648h.jpeg}	0	2024-03-29	2024-03-29	0
\.


--
-- TOC entry 3465 (class 0 OID 17966)
-- Dependencies: 223
-- Data for Name: nepe; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.nepe (id, nombre, cuando, su_casa, desde_casa, creado, revisado, activo) FROM stdin;
-2147483648	vito	{"lun":"","mar":"","mie":"12:28 pm 2024 03 20","jue":"","vie":"5:06 pm santo","sab":"","dom":""}	\N	t	2024-03-18	2024-03-29	t
-2147483647	rosin	{"lun":"","mar":"","mie":"por la tarde, 2:46 pm","jue":"","vie":"","sab":"","dom":""}	f	\N	2024-03-20	2024-03-29	t
\.


--
-- TOC entry 3466 (class 0 OID 17979)
-- Dependencies: 224
-- Data for Name: nepe_donde; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.nepe_donde (id, nepe_id, donde_id, creado, hits) FROM stdin;
18	-2147483648	19	2024-03-20	0
24	-2147483647	24	2024-03-27	0
25	-2147483648	25	2024-03-29	0
\.


--
-- TOC entry 3469 (class 0 OID 17987)
-- Dependencies: 227
-- Data for Name: nepe_que; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.nepe_que (id, nepe_id, que_id, creado, hits) FROM stdin;
27	-2147483648	31	2024-03-20	0
33	-2147483647	36	2024-03-27	0
34	-2147483648	37	2024-03-29	0
\.


--
-- TOC entry 3471 (class 0 OID 17994)
-- Dependencies: 229
-- Data for Name: que; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.que (id, frase) FROM stdin;
31	codeador con ai
36	cocino piononos
37	ciber
\.


--
-- TOC entry 3473 (class 0 OID 18001)
-- Dependencies: 231
-- Data for Name: social; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.social (id, handle, tipo, dueno_id) FROM stdin;
-2147483648	787-122-1212	tel	1024
-2147483647		email	1024
-2147483646		rs1	1024
-2147483645		rs2	1024
-2147483644	787-249-1819	tel	-2147483648
-2147483643	rosa@amfenol.com	email	-2147483648
-2147483642	@totin en tiktok	rs1	-2147483648
-2147483641	@rosita en fb	rs2	-2147483648
\.


--
-- TOC entry 3475 (class 0 OID 18005)
-- Dependencies: 233
-- Data for Name: video; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.video (id, url, nepe_id, creado, revisado, hits) FROM stdin;
1	lk_ _kj	-2147483648	2024-03-18	2024-03-29	0
2	ro_ _sa	-2147483647	2024-03-20	2024-03-29	0
\.


--
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 216
-- Name: donde_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.donde_id_seq', 25, true);


--
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 218
-- Name: dueno_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.dueno_id_seq', -2147483648, true);


--
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 220
-- Name: dueno_nepe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.dueno_nepe_id_seq', 2, true);


--
-- TOC entry 3496 (class 0 OID 0)
-- Dependencies: 222
-- Name: foto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.foto_id_seq', 4, true);


--
-- TOC entry 3497 (class 0 OID 0)
-- Dependencies: 225
-- Name: nepe_donde_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.nepe_donde_id_seq', 25, true);


--
-- TOC entry 3498 (class 0 OID 0)
-- Dependencies: 226
-- Name: nepe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.nepe_id_seq', -2147483647, true);


--
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 228
-- Name: nepe_que_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.nepe_que_id_seq', 34, true);


--
-- TOC entry 3500 (class 0 OID 0)
-- Dependencies: 230
-- Name: que_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.que_id_seq', 37, true);


--
-- TOC entry 3501 (class 0 OID 0)
-- Dependencies: 232
-- Name: social_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.social_id_seq', -2147483641, true);


--
-- TOC entry 3502 (class 0 OID 0)
-- Dependencies: 234
-- Name: video_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.video_id_seq', 2, true);


--
-- TOC entry 3273 (class 2606 OID 18025)
-- Name: donde donde_frase_key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.donde
    ADD CONSTRAINT donde_frase_key UNIQUE (frase);


--
-- TOC entry 3275 (class 2606 OID 18027)
-- Name: donde donde_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.donde
    ADD CONSTRAINT donde_pkey PRIMARY KEY (id);


--
-- TOC entry 3281 (class 2606 OID 18029)
-- Name: dueno_nepe dueno_nepe-key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno_nepe
    ADD CONSTRAINT "dueno_nepe-key" UNIQUE (nepe_id, dueno_id);


--
-- TOC entry 3283 (class 2606 OID 18031)
-- Name: dueno_nepe dueno_nepe_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno_nepe
    ADD CONSTRAINT dueno_nepe_pkey PRIMARY KEY (id);


--
-- TOC entry 3277 (class 2606 OID 18033)
-- Name: dueno dueno_nombre_key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno
    ADD CONSTRAINT dueno_nombre_key UNIQUE (nombre);


--
-- TOC entry 3279 (class 2606 OID 18035)
-- Name: dueno dueno_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno
    ADD CONSTRAINT dueno_pkey PRIMARY KEY (id);


--
-- TOC entry 3285 (class 2606 OID 18037)
-- Name: foto foto_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.foto
    ADD CONSTRAINT foto_pkey PRIMARY KEY (id);


--
-- TOC entry 3289 (class 2606 OID 18039)
-- Name: nepe_donde nepe_donde-key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_donde
    ADD CONSTRAINT "nepe_donde-key" UNIQUE (nepe_id, donde_id);


--
-- TOC entry 3291 (class 2606 OID 18041)
-- Name: nepe_donde nepe_donde_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_donde
    ADD CONSTRAINT nepe_donde_pkey PRIMARY KEY (id);


--
-- TOC entry 3287 (class 2606 OID 18043)
-- Name: nepe nepe_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe
    ADD CONSTRAINT nepe_pkey PRIMARY KEY (id);


--
-- TOC entry 3293 (class 2606 OID 18045)
-- Name: nepe_que nepe_que-key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_que
    ADD CONSTRAINT "nepe_que-key" UNIQUE (nepe_id, que_id);


--
-- TOC entry 3295 (class 2606 OID 18047)
-- Name: nepe_que nepe_que_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_que
    ADD CONSTRAINT nepe_que_pkey PRIMARY KEY (id);


--
-- TOC entry 3297 (class 2606 OID 18049)
-- Name: que que_frase_key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.que
    ADD CONSTRAINT que_frase_key UNIQUE (frase);


--
-- TOC entry 3299 (class 2606 OID 18051)
-- Name: que que_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.que
    ADD CONSTRAINT que_pkey PRIMARY KEY (id);


--
-- TOC entry 3301 (class 2606 OID 18053)
-- Name: social social_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.social
    ADD CONSTRAINT social_pkey PRIMARY KEY (id);


--
-- TOC entry 3303 (class 2606 OID 18055)
-- Name: video video_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.video
    ADD CONSTRAINT video_pkey PRIMARY KEY (id);


--
-- TOC entry 3305 (class 2606 OID 18057)
-- Name: video video_url_key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.video
    ADD CONSTRAINT video_url_key UNIQUE (url);


--
-- TOC entry 3306 (class 2606 OID 18058)
-- Name: dueno_nepe dueno_nepe-dueno_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno_nepe
    ADD CONSTRAINT "dueno_nepe-dueno_id-Fkey" FOREIGN KEY (dueno_id) REFERENCES public.dueno(id) ON DELETE CASCADE;


--
-- TOC entry 3307 (class 2606 OID 18063)
-- Name: dueno_nepe dueno_nepe-nepe_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno_nepe
    ADD CONSTRAINT "dueno_nepe-nepe_id-Fkey" FOREIGN KEY (nepe_id) REFERENCES public.nepe(id) ON DELETE CASCADE;


--
-- TOC entry 3308 (class 2606 OID 18068)
-- Name: foto foto-nepe_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.foto
    ADD CONSTRAINT "foto-nepe_id-Fkey" FOREIGN KEY (nepe_id) REFERENCES public.nepe(id) ON DELETE CASCADE;


--
-- TOC entry 3309 (class 2606 OID 18073)
-- Name: nepe_donde nepe_donde-donde_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_donde
    ADD CONSTRAINT "nepe_donde-donde_id-Fkey" FOREIGN KEY (donde_id) REFERENCES public.donde(id) ON DELETE CASCADE;


--
-- TOC entry 3310 (class 2606 OID 18078)
-- Name: nepe_donde nepe_donde-nepe_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_donde
    ADD CONSTRAINT "nepe_donde-nepe_id-Fkey" FOREIGN KEY (nepe_id) REFERENCES public.nepe(id) ON DELETE CASCADE;


--
-- TOC entry 3311 (class 2606 OID 18083)
-- Name: nepe_que nepe_que-nepe_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_que
    ADD CONSTRAINT "nepe_que-nepe_id-Fkey" FOREIGN KEY (nepe_id) REFERENCES public.nepe(id) ON DELETE CASCADE;


--
-- TOC entry 3312 (class 2606 OID 18088)
-- Name: nepe_que nepe_que-que_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_que
    ADD CONSTRAINT "nepe_que-que_id-Fkey" FOREIGN KEY (que_id) REFERENCES public.que(id) ON DELETE CASCADE;


--
-- TOC entry 3313 (class 2606 OID 18093)
-- Name: social social-dueno_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.social
    ADD CONSTRAINT "social-dueno_id-Fkey" FOREIGN KEY (dueno_id) REFERENCES public.dueno(id) ON DELETE CASCADE;


--
-- TOC entry 3314 (class 2606 OID 18098)
-- Name: video video-nepe_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.video
    ADD CONSTRAINT "video-nepe_id-Fkey" FOREIGN KEY (nepe_id) REFERENCES public.nepe(id) ON DELETE CASCADE;


-- Completed on 2024-03-29 17:31:26

--
-- PostgreSQL database dump complete
--

