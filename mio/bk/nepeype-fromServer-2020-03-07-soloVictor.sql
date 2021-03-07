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
-- Name: bregando; Type: TABLE; Schema: public; Owner: victordbu
--

CREATE TABLE public.bregando (
    dueno_id integer NOT NULL,
    nepe_id integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.bregando OWNER TO victordbu;

--
-- Name: bregando_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.bregando_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.bregando_id_seq OWNER TO victordbu;

--
-- Name: bregando_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.bregando_id_seq OWNED BY public.bregando.id;


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
-- Name: dueno_id_seq; Type: SEQUENCE; Schema: public; Owner: victordbu
--

CREATE SEQUENCE public.dueno_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.dueno_id_seq OWNER TO victordbu;

--
-- Name: dueno_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: victordbu
--

ALTER SEQUENCE public.dueno_id_seq OWNED BY public.dueno.id;


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

ALTER TABLE ONLY public.bregando ALTER COLUMN id SET DEFAULT nextval('public.bregando_id_seq'::regclass);


--
-- Name: dueno id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.dueno ALTER COLUMN id SET DEFAULT nextval('public.dueno_id_seq'::regclass);


--
-- Name: nepe id; Type: DEFAULT; Schema: public; Owner: victordbu
--

ALTER TABLE ONLY public.nepe ALTER COLUMN id SET DEFAULT nextval('public.nepe_id_seq'::regclass);


--
-- Data for Name: bregando; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.bregando (dueno_id, nepe_id, id) FROM stdin;
1024	1024	1024
\.


--
-- Name: bregando_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.bregando_id_seq', 1024, true);


--
-- Data for Name: dueno; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.dueno (id, username, password, last_log, first_log) FROM stdin;
1024	victor	$2y$10$lQXZ3nMwc0Yab83RCNsyvexCg5o.8K7.aEVvZWomo.p4WpmYoYGpu	2021-03-06	2020-12-27
\.


--
-- Name: dueno_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.dueno_id_seq', 1024, true);


--
-- Data for Name: nepe; Type: TABLE DATA; Schema: public; Owner: victordbu
--

COPY public.nepe (id, nombre, revisado, media_video_url, media_social_handle, media_foto_url, que, donde, a_tu_casa, nombre_que_vector, donde_vector, cuando) FROM stdin;
1024	víctor web development	2021-02-20	https://www.youtube.com/watch?v=zuxzE7--RYM	{"fbk":"","tt":"","igrm":"","phn":"939 260 1734"}	{1024a.jpeg,1024b.jpeg}	{desarollo,"páginas web","web development","full stack web development"}	{"las marias puerto rico",mayagüéz}	t	'desaroll':4 'development':3,8,12 'full':9 'pagin':5 'stack':10 'victor':1 'web':2,6,7,11	'las':1 'marias':2 'mayaguez':5 'puerto':3 'rico':4	{"lun":"","mar":"2hrs y media","mier":"","jue":"2hrs y media","vier":"","sab":"5am - 10:30pm","dom":"5am - 10pm"}
\.


--
-- Name: nepe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: victordbu
--

SELECT pg_catalog.setval('public.nepe_id_seq', 1024, true);


--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

--COPY public.spatial_ref_sys  FROM stdin;
-- \.


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
-- Name: TABLE bregando; Type: ACL; Schema: public; Owner: victordbu
--

GRANT ALL ON TABLE public.bregando TO victordbu;


--
-- Name: TABLE dueno; Type: ACL; Schema: public; Owner: victordbu
--

GRANT ALL ON TABLE public.dueno TO victordbu;


--
-- Name: TABLE nepe; Type: ACL; Schema: public; Owner: victordbu
--

GRANT ALL ON TABLE public.nepe TO victordbu;


--
-- PostgreSQL database dump complete
--

