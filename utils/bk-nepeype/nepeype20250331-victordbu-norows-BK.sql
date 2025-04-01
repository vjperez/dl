--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.3

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
-- Name: crea_dondevector_after_insert(); Type: FUNCTION; Schema: public; Owner: victordbu
--

CREATE FUNCTION public.crea_dondevector_after_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ BEGIN   UPDATE donde set donde_vector = to_tsvector('spanish', NEW.frase) where id=NEW.id;   RETURN NEW; END; $$;


ALTER FUNCTION public.crea_dondevector_after_insert() OWNER TO victordbu;

--
-- Name: crea_nombrevector_after_insert(); Type: FUNCTION; Schema: public; Owner: victordbu
--

CREATE FUNCTION public.crea_nombrevector_after_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ BEGIN    UPDATE nepe set nombre_vector =  to_tsvector('spanish', NEW.nombre) where id=NEW.id ;    RETURN NEW; END; $$;


ALTER FUNCTION public.crea_nombrevector_after_insert() OWNER TO victordbu;

--
-- Name: crea_quevector_after_insert(); Type: FUNCTION; Schema: public; Owner: victordbu
--

CREATE FUNCTION public.crea_quevector_after_insert() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ BEGIN   UPDATE que set que_vector = to_tsvector('spanish', NEW.frase) where id=NEW.id;   RETURN NEW; END; $$;


ALTER FUNCTION public.crea_quevector_after_insert() OWNER TO victordbu;

--
-- Name: update_nombrevector_after_update(); Type: FUNCTION; Schema: public; Owner: victordbu
--

CREATE FUNCTION public.update_nombrevector_after_update() RETURNS trigger
    LANGUAGE plpgsql
    AS $$ BEGIN   IF(NEW.nombre <> OLD.nombre) then     UPDATE nepe set nombre_vector =  to_tsvector('spanish', NEW.nombre) where id=NEW.id ;   END IF;    RETURN NEW; END; $$;


ALTER FUNCTION public.update_nombrevector_after_update() OWNER TO victordbu;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: donde; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.donde (
    id bigint NOT NULL,
    frase text NOT NULL,
    donde_vector tsvector
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


ALTER TABLE public.donde_id_seq OWNER TO victordbu;

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


ALTER TABLE public.dueno_id_seq OWNER TO victordbu;

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


ALTER TABLE public.dueno_nepe_id_seq OWNER TO victordbu;

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


ALTER TABLE public.foto_id_seq OWNER TO victordbu;

--
-- Name: foto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.foto_id_seq OWNED BY public.foto.id;


--
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


ALTER TABLE public.nepe_donde_id_seq OWNER TO victordbu;

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


ALTER TABLE public.nepe_id_seq OWNER TO victordbu;

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


ALTER TABLE public.nepe_que_id_seq OWNER TO victordbu;

--
-- Name: nepe_que_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.nepe_que_id_seq OWNED BY public.nepe_que.id;


--
-- Name: que; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.que (
    id bigint NOT NULL,
    frase text NOT NULL,
    que_vector tsvector
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


ALTER TABLE public.que_id_seq OWNER TO victordbu;

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


ALTER TABLE public.social_id_seq OWNER TO victordbu;

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


ALTER TABLE public.video_id_seq OWNER TO victordbu;

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

COPY public.donde (id, frase, donde_vector) FROM stdin;
\.


--
-- Data for Name: dueno; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.dueno (id, nombre, clave, activo, last_log, first_log) FROM stdin;
\.


--
-- Data for Name: dueno_nepe; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.dueno_nepe (id, dueno_id, nepe_id, creado, vence, activo) FROM stdin;
\.


--
-- Data for Name: foto; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.foto (id, nepe_id, urls, prox_indice, creado, revisado, hits) FROM stdin;
\.


--
-- Data for Name: nepe; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.nepe (id, nombre, cuando, su_casa, desde_casa, creado, revisado, activo, nombre_vector) FROM stdin;
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

COPY public.social (id, contactos, dueno_id) FROM stdin;
\.


--
-- Data for Name: video; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.video (id, url, nepe_id, creado, revisado, hits) FROM stdin;
\.


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

SELECT pg_catalog.setval('public.dueno_nepe_id_seq', 1, false);


--
-- Name: foto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.foto_id_seq', 1, false);


--
-- Name: nepe_donde_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.nepe_donde_id_seq', 1, false);


--
-- Name: nepe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.nepe_id_seq', -2147483648, false);


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

SELECT pg_catalog.setval('public.video_id_seq', 1, false);


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
-- Name: donde after_insert_dondefrase_trigger; Type: TRIGGER; Schema: public; Owner: victordbu
--

CREATE TRIGGER after_insert_dondefrase_trigger AFTER INSERT ON public.donde FOR EACH ROW EXECUTE FUNCTION public.crea_dondevector_after_insert();


--
-- Name: nepe after_insert_nombre_trigger; Type: TRIGGER; Schema: public; Owner: victordbu
--

CREATE TRIGGER after_insert_nombre_trigger AFTER INSERT ON public.nepe FOR EACH ROW EXECUTE FUNCTION public.crea_nombrevector_after_insert();


--
-- Name: que after_insert_quefrase_trigger; Type: TRIGGER; Schema: public; Owner: victordbu
--

CREATE TRIGGER after_insert_quefrase_trigger AFTER INSERT ON public.que FOR EACH ROW EXECUTE FUNCTION public.crea_quevector_after_insert();


--
-- Name: nepe after_update_nombre_trigger; Type: TRIGGER; Schema: public; Owner: victordbu
--

CREATE TRIGGER after_update_nombre_trigger AFTER UPDATE ON public.nepe FOR EACH ROW EXECUTE FUNCTION public.update_nombrevector_after_update();


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
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT ALL ON SCHEMA public TO victordbu;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: victordbu
--

ALTER DEFAULT PRIVILEGES FOR ROLE victordbu IN SCHEMA public GRANT SELECT,INSERT ON TABLES  TO victordbu;


--
-- PostgreSQL database dump complete
--

