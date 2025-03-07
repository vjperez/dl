--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

-- Started on 2025-02-26 23:54:04

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
-- TOC entry 2 (class 3079 OID 26539)
-- Name: unaccent; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS unaccent WITH SCHEMA public;


--
-- TOC entry 3487 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION unaccent; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION unaccent IS 'text search dictionary that removes accents';


--
-- TOC entry 241 (class 1255 OID 26758)
-- Name: crea_dondevector_after_insert(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.crea_dondevector_after_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ BEGIN   UPDATE donde set donde_vector = to_tsvector('spanish', NEW.frase) where id=NEW.id;   RETURN NEW; END; $$;


ALTER FUNCTION public.crea_dondevector_after_insert() OWNER TO postgres;

--
-- TOC entry 239 (class 1255 OID 26734)
-- Name: crea_nombrevector_after_insert(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.crea_nombrevector_after_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ BEGIN    UPDATE nepe set nombre_vector =  to_tsvector('spanish', NEW.nombre) where id=NEW.id ;    RETURN NEW; END; $$;


ALTER FUNCTION public.crea_nombrevector_after_insert() OWNER TO postgres;

--
-- TOC entry 242 (class 1255 OID 26759)
-- Name: crea_quevector_after_insert(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.crea_quevector_after_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ BEGIN   UPDATE que set que_vector = to_tsvector('spanish', NEW.frase) where id=NEW.id;   RETURN NEW; END; $$;


ALTER FUNCTION public.crea_quevector_after_insert() OWNER TO postgres;

--
-- TOC entry 240 (class 1255 OID 26756)
-- Name: update_nombrevector_after_update(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_nombrevector_after_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ BEGIN   IF(NEW.nombre <> OLD.nombre) then     UPDATE nepe set nombre_vector =  to_tsvector('spanish', NEW.nombre) where id=NEW.id ;   END IF;    RETURN NEW; END; $$;


ALTER FUNCTION public.update_nombrevector_after_update() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 26546)
-- Name: donde; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.donde (
    id bigint NOT NULL,
    frase text NOT NULL,
    donde_vector tsvector
);


ALTER TABLE public.donde OWNER TO victordbu;

--
-- TOC entry 216 (class 1259 OID 26552)
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
-- TOC entry 3488 (class 0 OID 0)
-- Dependencies: 216
-- Name: donde_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.donde_id_seq OWNED BY public.donde.id;


--
-- TOC entry 217 (class 1259 OID 26553)
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
-- TOC entry 218 (class 1259 OID 26561)
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
-- TOC entry 3489 (class 0 OID 0)
-- Dependencies: 218
-- Name: dueno_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.dueno_id_seq OWNED BY public.dueno.id;


--
-- TOC entry 219 (class 1259 OID 26562)
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
-- TOC entry 220 (class 1259 OID 26570)
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
-- TOC entry 3490 (class 0 OID 0)
-- Dependencies: 220
-- Name: dueno_nepe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.dueno_nepe_id_seq OWNED BY public.dueno_nepe.id;


--
-- TOC entry 221 (class 1259 OID 26571)
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
-- TOC entry 222 (class 1259 OID 26582)
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
-- TOC entry 3491 (class 0 OID 0)
-- Dependencies: 222
-- Name: foto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.foto_id_seq OWNED BY public.foto.id;


--
-- TOC entry 223 (class 1259 OID 26583)
-- Name: nepe; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.nepe (
    id integer NOT NULL,
    nombre text NOT NULL,
    cuando json NOT NULL,
    su_casa boolean DEFAULT false,
    desde_casa boolean DEFAULT false,
    creado date DEFAULT '2010-01-01'::date NOT NULL,
    revisado date DEFAULT '2010-01-01'::date NOT NULL,
    activo boolean DEFAULT true NOT NULL,
    nombre_vector tsvector,
    CONSTRAINT nepe_creado_check CHECK ((creado > '2019-12-31'::date)),
    CONSTRAINT nepe_revisado_check CHECK ((revisado > '2019-12-31'::date))
);


ALTER TABLE public.nepe OWNER TO victordbu;

--
-- TOC entry 224 (class 1259 OID 26596)
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
-- TOC entry 225 (class 1259 OID 26602)
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
-- TOC entry 3492 (class 0 OID 0)
-- Dependencies: 225
-- Name: nepe_donde_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.nepe_donde_id_seq OWNED BY public.nepe_donde.id;


--
-- TOC entry 226 (class 1259 OID 26603)
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
-- TOC entry 3493 (class 0 OID 0)
-- Dependencies: 226
-- Name: nepe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.nepe_id_seq OWNED BY public.nepe.id;


--
-- TOC entry 227 (class 1259 OID 26604)
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
-- TOC entry 228 (class 1259 OID 26610)
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
-- TOC entry 3494 (class 0 OID 0)
-- Dependencies: 228
-- Name: nepe_que_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.nepe_que_id_seq OWNED BY public.nepe_que.id;


--
-- TOC entry 229 (class 1259 OID 26611)
-- Name: que; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.que (
    id bigint NOT NULL,
    frase text NOT NULL,
    que_vector tsvector
);


ALTER TABLE public.que OWNER TO victordbu;

--
-- TOC entry 230 (class 1259 OID 26617)
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
-- TOC entry 3495 (class 0 OID 0)
-- Dependencies: 230
-- Name: que_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.que_id_seq OWNED BY public.que.id;


--
-- TOC entry 231 (class 1259 OID 26618)
-- Name: social; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.social (
    id integer NOT NULL,
    contactos text[] NOT NULL,
    dueno_id integer NOT NULL
);


ALTER TABLE public.social OWNER TO victordbu;

--
-- TOC entry 232 (class 1259 OID 26623)
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
-- TOC entry 3496 (class 0 OID 0)
-- Dependencies: 232
-- Name: social_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.social_id_seq OWNED BY public.social.id;


--
-- TOC entry 233 (class 1259 OID 26624)
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
-- TOC entry 234 (class 1259 OID 26632)
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
-- TOC entry 3497 (class 0 OID 0)
-- Dependencies: 234
-- Name: video_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.video_id_seq OWNED BY public.video.id;


--
-- TOC entry 3230 (class 2604 OID 26633)
-- Name: donde id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.donde ALTER COLUMN id SET DEFAULT nextval('public.donde_id_seq'::regclass);


--
-- TOC entry 3231 (class 2604 OID 26634)
-- Name: dueno id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno ALTER COLUMN id SET DEFAULT nextval('public.dueno_id_seq'::regclass);


--
-- TOC entry 3235 (class 2604 OID 26635)
-- Name: dueno_nepe id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno_nepe ALTER COLUMN id SET DEFAULT nextval('public.dueno_nepe_id_seq'::regclass);


--
-- TOC entry 3239 (class 2604 OID 26636)
-- Name: foto id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.foto ALTER COLUMN id SET DEFAULT nextval('public.foto_id_seq'::regclass);


--
-- TOC entry 3244 (class 2604 OID 26637)
-- Name: nepe id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe ALTER COLUMN id SET DEFAULT nextval('public.nepe_id_seq'::regclass);


--
-- TOC entry 3250 (class 2604 OID 26638)
-- Name: nepe_donde id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_donde ALTER COLUMN id SET DEFAULT nextval('public.nepe_donde_id_seq'::regclass);


--
-- TOC entry 3253 (class 2604 OID 26639)
-- Name: nepe_que id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_que ALTER COLUMN id SET DEFAULT nextval('public.nepe_que_id_seq'::regclass);


--
-- TOC entry 3256 (class 2604 OID 26640)
-- Name: que id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.que ALTER COLUMN id SET DEFAULT nextval('public.que_id_seq'::regclass);


--
-- TOC entry 3257 (class 2604 OID 26641)
-- Name: social id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.social ALTER COLUMN id SET DEFAULT nextval('public.social_id_seq'::regclass);


--
-- TOC entry 3258 (class 2604 OID 26642)
-- Name: video id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.video ALTER COLUMN id SET DEFAULT nextval('public.video_id_seq'::regclass);


--
-- TOC entry 3461 (class 0 OID 26546)
-- Dependencies: 215
-- Data for Name: donde; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.donde (id, frase, donde_vector) FROM stdin;
\.


--
-- TOC entry 3463 (class 0 OID 26553)
-- Dependencies: 217
-- Data for Name: dueno; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.dueno (id, nombre, clave, activo, last_log, first_log) FROM stdin;
-2147483648	victor	$2y$10$3pirAJAfGW3A/Ax.my9N5OkX6ATsbSih7WDyaL0fJjMjWIJ6EOL1u	t	2025-02-26	2024-09-30
\.


--
-- TOC entry 3465 (class 0 OID 26562)
-- Dependencies: 219
-- Data for Name: dueno_nepe; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.dueno_nepe (id, dueno_id, nepe_id, creado, vence, activo) FROM stdin;
\.


--
-- TOC entry 3467 (class 0 OID 26571)
-- Dependencies: 221
-- Data for Name: foto; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.foto (id, nepe_id, urls, prox_indice, creado, revisado, hits) FROM stdin;
\.


--
-- TOC entry 3469 (class 0 OID 26583)
-- Dependencies: 223
-- Data for Name: nepe; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.nepe (id, nombre, cuando, su_casa, desde_casa, creado, revisado, activo, nombre_vector) FROM stdin;
\.


--
-- TOC entry 3470 (class 0 OID 26596)
-- Dependencies: 224
-- Data for Name: nepe_donde; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.nepe_donde (id, nepe_id, donde_id, creado, hits) FROM stdin;
\.


--
-- TOC entry 3473 (class 0 OID 26604)
-- Dependencies: 227
-- Data for Name: nepe_que; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.nepe_que (id, nepe_id, que_id, creado, hits) FROM stdin;
\.


--
-- TOC entry 3475 (class 0 OID 26611)
-- Dependencies: 229
-- Data for Name: que; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.que (id, frase, que_vector) FROM stdin;
\.


--
-- TOC entry 3477 (class 0 OID 26618)
-- Dependencies: 231
-- Data for Name: social; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.social (id, contactos, dueno_id) FROM stdin;
-2147483647	{787-374-0845,eldonlibre@gmail.com,"donlibre @ x",""}	-2147483648
\.


--
-- TOC entry 3479 (class 0 OID 26624)
-- Dependencies: 233
-- Data for Name: video; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.video (id, url, nepe_id, creado, revisado, hits) FROM stdin;
\.


--
-- TOC entry 3498 (class 0 OID 0)
-- Dependencies: 216
-- Name: donde_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.donde_id_seq', 1, true);


--
-- TOC entry 3499 (class 0 OID 0)
-- Dependencies: 218
-- Name: dueno_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.dueno_id_seq', -2147483641, true);


--
-- TOC entry 3500 (class 0 OID 0)
-- Dependencies: 220
-- Name: dueno_nepe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.dueno_nepe_id_seq', 10, true);


--
-- TOC entry 3501 (class 0 OID 0)
-- Dependencies: 222
-- Name: foto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.foto_id_seq', 1, true);


--
-- TOC entry 3502 (class 0 OID 0)
-- Dependencies: 225
-- Name: nepe_donde_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.nepe_donde_id_seq', 1, true);


--
-- TOC entry 3503 (class 0 OID 0)
-- Dependencies: 226
-- Name: nepe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.nepe_id_seq', -2147483639, true);


--
-- TOC entry 3504 (class 0 OID 0)
-- Dependencies: 228
-- Name: nepe_que_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.nepe_que_id_seq', 25, true);


--
-- TOC entry 3505 (class 0 OID 0)
-- Dependencies: 230
-- Name: que_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.que_id_seq', 25, true);


--
-- TOC entry 3506 (class 0 OID 0)
-- Dependencies: 232
-- Name: social_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.social_id_seq', -2147483644, true);


--
-- TOC entry 3507 (class 0 OID 0)
-- Dependencies: 234
-- Name: video_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.video_id_seq', 18, true);


--
-- TOC entry 3275 (class 2606 OID 26730)
-- Name: donde donde_frase_key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.donde
    ADD CONSTRAINT donde_frase_key UNIQUE (frase);


--
-- TOC entry 3277 (class 2606 OID 26646)
-- Name: donde donde_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.donde
    ADD CONSTRAINT donde_pkey PRIMARY KEY (id);


--
-- TOC entry 3283 (class 2606 OID 26648)
-- Name: dueno_nepe dueno_nepe-key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno_nepe
    ADD CONSTRAINT "dueno_nepe-key" UNIQUE (nepe_id, dueno_id);


--
-- TOC entry 3285 (class 2606 OID 26650)
-- Name: dueno_nepe dueno_nepe_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno_nepe
    ADD CONSTRAINT dueno_nepe_pkey PRIMARY KEY (id);


--
-- TOC entry 3279 (class 2606 OID 26652)
-- Name: dueno dueno_nombre_key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno
    ADD CONSTRAINT dueno_nombre_key UNIQUE (nombre);


--
-- TOC entry 3281 (class 2606 OID 26654)
-- Name: dueno dueno_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno
    ADD CONSTRAINT dueno_pkey PRIMARY KEY (id);


--
-- TOC entry 3287 (class 2606 OID 26656)
-- Name: foto foto_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.foto
    ADD CONSTRAINT foto_pkey PRIMARY KEY (id);


--
-- TOC entry 3291 (class 2606 OID 26658)
-- Name: nepe_donde nepe_donde-key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_donde
    ADD CONSTRAINT "nepe_donde-key" UNIQUE (nepe_id, donde_id);


--
-- TOC entry 3293 (class 2606 OID 26660)
-- Name: nepe_donde nepe_donde_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_donde
    ADD CONSTRAINT nepe_donde_pkey PRIMARY KEY (id);


--
-- TOC entry 3289 (class 2606 OID 26662)
-- Name: nepe nepe_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe
    ADD CONSTRAINT nepe_pkey PRIMARY KEY (id);


--
-- TOC entry 3295 (class 2606 OID 26664)
-- Name: nepe_que nepe_que-key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_que
    ADD CONSTRAINT "nepe_que-key" UNIQUE (nepe_id, que_id);


--
-- TOC entry 3297 (class 2606 OID 26666)
-- Name: nepe_que nepe_que_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_que
    ADD CONSTRAINT nepe_que_pkey PRIMARY KEY (id);


--
-- TOC entry 3299 (class 2606 OID 26728)
-- Name: que que_frase_key; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.que
    ADD CONSTRAINT que_frase_key UNIQUE (frase);


--
-- TOC entry 3301 (class 2606 OID 26670)
-- Name: que que_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.que
    ADD CONSTRAINT que_pkey PRIMARY KEY (id);


--
-- TOC entry 3303 (class 2606 OID 26672)
-- Name: social social_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.social
    ADD CONSTRAINT social_pkey PRIMARY KEY (id);


--
-- TOC entry 3305 (class 2606 OID 26674)
-- Name: video video_pkey; Type: CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.video
    ADD CONSTRAINT video_pkey PRIMARY KEY (id);


--
-- TOC entry 3315 (class 2620 OID 26761)
-- Name: donde after_insert_dondefrase_trigger; Type: TRIGGER; Schema: public; Owner: victordbu
--

CREATE TRIGGER after_insert_dondefrase_trigger AFTER INSERT ON public.donde FOR EACH ROW EXECUTE FUNCTION public.crea_dondevector_after_insert();


--
-- TOC entry 3316 (class 2620 OID 26755)
-- Name: nepe after_insert_nombre_trigger; Type: TRIGGER; Schema: public; Owner: victordbu
--

CREATE TRIGGER after_insert_nombre_trigger AFTER INSERT ON public.nepe FOR EACH ROW EXECUTE FUNCTION public.crea_nombrevector_after_insert();


--
-- TOC entry 3318 (class 2620 OID 26760)
-- Name: que after_insert_quefrase_trigger; Type: TRIGGER; Schema: public; Owner: victordbu
--

CREATE TRIGGER after_insert_quefrase_trigger AFTER INSERT ON public.que FOR EACH ROW EXECUTE FUNCTION public.crea_quevector_after_insert();


--
-- TOC entry 3317 (class 2620 OID 26757)
-- Name: nepe after_update_nombre_trigger; Type: TRIGGER; Schema: public; Owner: victordbu
--

CREATE TRIGGER after_update_nombre_trigger AFTER UPDATE ON public.nepe FOR EACH ROW EXECUTE FUNCTION public.update_nombrevector_after_update();


--
-- TOC entry 3306 (class 2606 OID 26675)
-- Name: dueno_nepe dueno_nepe-dueno_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno_nepe
    ADD CONSTRAINT "dueno_nepe-dueno_id-Fkey" FOREIGN KEY (dueno_id) REFERENCES public.dueno(id) ON DELETE CASCADE;


--
-- TOC entry 3307 (class 2606 OID 26680)
-- Name: dueno_nepe dueno_nepe-nepe_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno_nepe
    ADD CONSTRAINT "dueno_nepe-nepe_id-Fkey" FOREIGN KEY (nepe_id) REFERENCES public.nepe(id) ON DELETE CASCADE;


--
-- TOC entry 3308 (class 2606 OID 26685)
-- Name: foto foto-nepe_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.foto
    ADD CONSTRAINT "foto-nepe_id-Fkey" FOREIGN KEY (nepe_id) REFERENCES public.nepe(id) ON DELETE CASCADE;


--
-- TOC entry 3309 (class 2606 OID 26690)
-- Name: nepe_donde nepe_donde-donde_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_donde
    ADD CONSTRAINT "nepe_donde-donde_id-Fkey" FOREIGN KEY (donde_id) REFERENCES public.donde(id) ON DELETE CASCADE;


--
-- TOC entry 3310 (class 2606 OID 26695)
-- Name: nepe_donde nepe_donde-nepe_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_donde
    ADD CONSTRAINT "nepe_donde-nepe_id-Fkey" FOREIGN KEY (nepe_id) REFERENCES public.nepe(id) ON DELETE CASCADE;


--
-- TOC entry 3311 (class 2606 OID 26700)
-- Name: nepe_que nepe_que-nepe_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_que
    ADD CONSTRAINT "nepe_que-nepe_id-Fkey" FOREIGN KEY (nepe_id) REFERENCES public.nepe(id) ON DELETE CASCADE;


--
-- TOC entry 3312 (class 2606 OID 26705)
-- Name: nepe_que nepe_que-que_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe_que
    ADD CONSTRAINT "nepe_que-que_id-Fkey" FOREIGN KEY (que_id) REFERENCES public.que(id) ON DELETE CASCADE;


--
-- TOC entry 3313 (class 2606 OID 26710)
-- Name: social social-dueno_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.social
    ADD CONSTRAINT "social-dueno_id-Fkey" FOREIGN KEY (dueno_id) REFERENCES public.dueno(id) ON DELETE CASCADE;


--
-- TOC entry 3314 (class 2606 OID 26715)
-- Name: video video-nepe_id-Fkey; Type: FK CONSTRAINT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.video
    ADD CONSTRAINT "video-nepe_id-Fkey" FOREIGN KEY (nepe_id) REFERENCES public.nepe(id) ON DELETE CASCADE;


--
-- TOC entry 3486 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO victordbu;


--
-- TOC entry 2091 (class 826 OID 26731)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: victordbu
--

ALTER DEFAULT PRIVILEGES FOR ROLE victordbu IN SCHEMA public GRANT SELECT,INSERT ON TABLES  TO victordbu;


-- Completed on 2025-02-26 23:54:04

--
-- PostgreSQL database dump complete
--

