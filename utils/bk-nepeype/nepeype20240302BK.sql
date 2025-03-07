--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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
-- Name: cuando; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.cuando (
    id integer NOT NULL,
    nepe_id integer NOT NULL,
    horas jsonb NOT NULL,
    creado date DEFAULT '2010-01-01'::date NOT NULL,
    CONSTRAINT cuando_creado_check CHECK ((creado > '2019-12-31'::date))
);


ALTER TABLE public.cuando OWNER TO victordbu;

--
-- Name: cuando_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.cuando_id_seq
    AS integer
    START WITH -2147483648
    INCREMENT BY 1
    MINVALUE -2147483648
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cuando_id_seq OWNER TO victordbu;

--
-- Name: cuando_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.cuando_id_seq OWNED BY public.cuando.id;


--
-- Name: donde; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.donde (
    id bigint NOT NULL,
    frase character varying(64) NOT NULL,
    donde_vector tsvector NOT NULL
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
    last_log date DEFAULT '2010-01-01'::date NOT NULL,
    first_log date DEFAULT '2010-01-01'::date NOT NULL,
    activo boolean DEFAULT true NOT NULL,
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
    creado date DEFAULT '2010-01-01'::date NOT NULL,
    vence date DEFAULT '2010-01-01'::date NOT NULL,
    nepe_id integer NOT NULL,
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
    url character varying(64) NOT NULL,
    nepe_id integer NOT NULL,
    creado date DEFAULT '2010-01-01'::date NOT NULL,
    hits bigint DEFAULT 0 NOT NULL,
    CONSTRAINT foto_creado_check CHECK ((creado > '2019-12-31'::date))
);


ALTER TABLE public.foto OWNER TO victordbu;

--
-- Name: foto_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.foto_id_seq
    START WITH -9223372036854775808
    INCREMENT BY 1
    MINVALUE -9223372036854775808
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
    su_casa boolean DEFAULT false,
    cuando json NOT NULL,
    creado date DEFAULT '2010-01-01'::date NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    desde_casa boolean DEFAULT false,
    CONSTRAINT nepe_creado_check CHECK ((creado > '2019-12-31'::date))
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
    que_vector tsvector NOT NULL
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
    handle character varying(64) NOT NULL,
    dueno_id integer NOT NULL,
    tipo character varying(64) NOT NULL
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
    hits bigint DEFAULT 0 NOT NULL,
    CONSTRAINT video_creado_check CHECK ((creado > '2019-12-31'::date))
);


ALTER TABLE public.video OWNER TO victordbu;

--
-- Name: video_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.video_id_seq
    START WITH -9223372036854775808
    INCREMENT BY 1
    MINVALUE -9223372036854775808
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.video_id_seq OWNER TO victordbu;

--
-- Name: video_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.video_id_seq OWNED BY public.video.id;


--
-- Name: cuando id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.cuando ALTER COLUMN id SET DEFAULT nextval('public.cuando_id_seq'::regclass);


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
-- Data for Name: cuando; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.cuando (id, nepe_id, horas, creado) FROM stdin;
\.


--
-- Data for Name: donde; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.donde (id, frase, donde_vector) FROM stdin;
\.


--
-- Data for Name: dueno; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.dueno (id, nombre, clave, last_log, first_log, activo) FROM stdin;
1024	victor	$2y$10$iU29bhi4vBGw6qYBTvuG9.txjSTuwPkrSzi9ESmQPd1Tp4C1z8MfG	2024-03-02	2021-10-24	t
\.


--
-- Data for Name: dueno_nepe; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.dueno_nepe (id, dueno_id, creado, vence, nepe_id, activo) FROM stdin;
1	1024	2024-02-28	2025-02-27	-2147483646	t
2	1024	2024-02-28	2025-02-27	-2147483645	t
3	1024	2024-02-28	2025-02-27	-2147483644	t
4	1024	2024-02-28	2025-02-27	-2147483643	t
\.


--
-- Data for Name: foto; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.foto (id, url, nepe_id, creado, hits) FROM stdin;
\.


--
-- Data for Name: nepe; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.nepe (id, nombre, su_casa, cuando, creado, activo, desde_casa) FROM stdin;
-2147483646	abd	\N	{"lun":"","mar":"","mier":"","jue":"","vier":"","sab":"","dom":""}	2024-02-28	t	f
-2147483645	coco	f	{"lun":"","mar":"","mier":"","jue":"","vier":"","sab":"","dom":""}	2024-02-28	t	\N
-2147483644	epale	\N	{"lun":"","mar":"","mier":"","jue":"","vier":"","sab":"","dom":""}	2024-02-28	t	t
-2147483643	pepo	t	{"lun":"","mar":"","mier":"","jue":"","vier":"","sab":"","dom":""}	2024-02-28	t	t
\.


--
-- Data for Name: nepe_donde; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.nepe_donde (id, nepe_id, donde_id, creado, hits) FROM stdin;
\.


--
-- Data for Name: nepe_que; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.nepe_que (id, nepe_id, que_id, creado, hits) FROM stdin;
\.


--
-- Data for Name: que; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.que (id, frase, que_vector) FROM stdin;
\.


--
-- Data for Name: social; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.social (id, handle, dueno_id, tipo) FROM stdin;
\.


--
-- Data for Name: video; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.video (id, url, nepe_id, creado, hits) FROM stdin;
\.


--
-- Name: cuando_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.cuando_id_seq', -2147483648, false);


--
-- Name: donde_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.donde_id_seq', 1, false);


--
-- Name: dueno_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.dueno_id_seq', -2147483648, false);


--
-- Name: dueno_nepe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.dueno_nepe_id_seq', 4, true);


--
-- Name: foto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.foto_id_seq', -2147483648, false);


--
-- Name: nepe_donde_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.nepe_donde_id_seq', 1, false);


--
-- Name: nepe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.nepe_id_seq', -2147483643, true);


--
-- Name: nepe_que_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.nepe_que_id_seq', 1, false);


--
-- Name: que_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.que_id_seq', 1, false);


--
-- Name: social_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.social_id_seq', -2147483648, false);


--
-- Name: video_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.video_id_seq', -2147483648, false);


--
-- Name: cuando cuando_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.cuando
    ADD CONSTRAINT cuando_pkey PRIMARY KEY (id);


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
-- Name: foto foto_url_key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.foto
    ADD CONSTRAINT foto_url_key UNIQUE (url);


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
-- Name: cuando cuando-nepe_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.cuando
    ADD CONSTRAINT "cuando-nepe_id-Fkey" FOREIGN KEY (nepe_id) REFERENCES public.nepe(id) ON DELETE CASCADE;


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

