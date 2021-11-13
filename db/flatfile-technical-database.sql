--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.0

-- Started on 2021-11-13 17:21:02 EST

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

SET default_table_access_method = heap;

--
-- TOC entry 207 (class 1259 OID 16484)
-- Name: boards; Type: TABLE; Schema: public; Owner: technical
--

CREATE TABLE public.boards (
    id integer NOT NULL,
    title character varying NOT NULL
);


ALTER TABLE public.boards OWNER TO technical;

--
-- TOC entry 206 (class 1259 OID 16482)
-- Name: boards_id_seq; Type: SEQUENCE; Schema: public; Owner: technical
--

CREATE SEQUENCE public.boards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.boards_id_seq OWNER TO technical;

--
-- TOC entry 3031 (class 0 OID 0)
-- Dependencies: 206
-- Name: boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: technical
--

ALTER SEQUENCE public.boards_id_seq OWNED BY public.boards.id;


--
-- TOC entry 203 (class 1259 OID 16400)
-- Name: cards; Type: TABLE; Schema: public; Owner: technical
--

CREATE TABLE public.cards (
    id integer NOT NULL,
    section_id integer NOT NULL,
    title character varying NOT NULL
);


ALTER TABLE public.cards OWNER TO technical;

--
-- TOC entry 202 (class 1259 OID 16396)
-- Name: cards_id_seq; Type: SEQUENCE; Schema: public; Owner: technical
--

CREATE SEQUENCE public.cards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cards_id_seq OWNER TO technical;

--
-- TOC entry 3032 (class 0 OID 0)
-- Dependencies: 202
-- Name: cards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: technical
--

ALTER SEQUENCE public.cards_id_seq OWNED BY public.cards.id;


--
-- TOC entry 205 (class 1259 OID 16412)
-- Name: migrations; Type: TABLE; Schema: public; Owner: technical
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO technical;

--
-- TOC entry 204 (class 1259 OID 16410)
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: technical
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO technical;

--
-- TOC entry 3033 (class 0 OID 0)
-- Dependencies: 204
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: technical
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- TOC entry 201 (class 1259 OID 16387)
-- Name: sections; Type: TABLE; Schema: public; Owner: technical
--

CREATE TABLE public.sections (
    id integer NOT NULL,
    title character varying NOT NULL,
    board_id integer NOT NULL
);


ALTER TABLE public.sections OWNER TO technical;

--
-- TOC entry 200 (class 1259 OID 16385)
-- Name: sections_id_seq; Type: SEQUENCE; Schema: public; Owner: technical
--

CREATE SEQUENCE public.sections_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sections_id_seq OWNER TO technical;

--
-- TOC entry 3034 (class 0 OID 0)
-- Dependencies: 200
-- Name: sections_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: technical
--

ALTER SEQUENCE public.sections_id_seq OWNED BY public.sections.id;


--
-- TOC entry 2875 (class 2604 OID 16487)
-- Name: boards id; Type: DEFAULT; Schema: public; Owner: technical
--

ALTER TABLE ONLY public.boards ALTER COLUMN id SET DEFAULT nextval('public.boards_id_seq'::regclass);


--
-- TOC entry 2873 (class 2604 OID 16403)
-- Name: cards id; Type: DEFAULT; Schema: public; Owner: technical
--

ALTER TABLE ONLY public.cards ALTER COLUMN id SET DEFAULT nextval('public.cards_id_seq'::regclass);


--
-- TOC entry 2874 (class 2604 OID 16415)
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: technical
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- TOC entry 2872 (class 2604 OID 16390)
-- Name: sections id; Type: DEFAULT; Schema: public; Owner: technical
--

ALTER TABLE ONLY public.sections ALTER COLUMN id SET DEFAULT nextval('public.sections_id_seq'::regclass);


--
-- TOC entry 3025 (class 0 OID 16484)
-- Dependencies: 207
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: technical
--

COPY public.boards (id, title) FROM stdin;
1	Totoro
31	Kiki
\.


--
-- TOC entry 3021 (class 0 OID 16400)
-- Dependencies: 203
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: technical
--

COPY public.cards (id, section_id, title) FROM stdin;
5	1	Card drag/drop
6	1	Card details
7	1	Multiple boards
8	1	Dark mode
\.


--
-- TOC entry 3023 (class 0 OID 16412)
-- Dependencies: 205
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: technical
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1636225583045	AddBoards1636225583045
2	1636410445437	MigrationName1636410445437
3	1636646303044	boards1636646303044
4	1636647098747	updateType1636647098747
5	1636730588988	updateBoardRelation1636730588988
\.


--
-- TOC entry 3019 (class 0 OID 16387)
-- Dependencies: 201
-- Data for Name: sections; Type: TABLE DATA; Schema: public; Owner: technical
--

COPY public.sections (id, title, board_id) FROM stdin;
106	Backlog	31
107	In review	31
108	Ready For Development	31
109	In progress	31
110	Done	31
1	Backlog	1
2	Ready for Development	1
3	In Progress	1
4	In Review	1
5	Done	1
\.


--
-- TOC entry 3035 (class 0 OID 0)
-- Dependencies: 206
-- Name: boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: technical
--

SELECT pg_catalog.setval('public.boards_id_seq', 31, true);


--
-- TOC entry 3036 (class 0 OID 0)
-- Dependencies: 202
-- Name: cards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: technical
--

SELECT pg_catalog.setval('public.cards_id_seq', 8, true);


--
-- TOC entry 3037 (class 0 OID 0)
-- Dependencies: 204
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: technical
--

SELECT pg_catalog.setval('public.migrations_id_seq', 5, true);


--
-- TOC entry 3038 (class 0 OID 0)
-- Dependencies: 200
-- Name: sections_id_seq; Type: SEQUENCE SET; Schema: public; Owner: technical
--

SELECT pg_catalog.setval('public.sections_id_seq', 110, true);


--
-- TOC entry 2883 (class 2606 OID 16493)
-- Name: boards PK_606923b0b068ef262dfdcd18f44; Type: CONSTRAINT; Schema: public; Owner: technical
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT "PK_606923b0b068ef262dfdcd18f44" PRIMARY KEY (id);


--
-- TOC entry 2881 (class 2606 OID 16420)
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: technical
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- TOC entry 2885 (class 2606 OID 16508)
-- Name: boards UQ_9cf0ff28e768678e382fedac49d; Type: CONSTRAINT; Schema: public; Owner: technical
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT "UQ_9cf0ff28e768678e382fedac49d" UNIQUE (title);


--
-- TOC entry 2879 (class 2606 OID 16409)
-- Name: cards cards_pkey; Type: CONSTRAINT; Schema: public; Owner: technical
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- TOC entry 2877 (class 2606 OID 16395)
-- Name: sections sections_pkey; Type: CONSTRAINT; Schema: public; Owner: technical
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT sections_pkey PRIMARY KEY (id);


--
-- TOC entry 2886 (class 2606 OID 16509)
-- Name: sections FK_29fa67620fff739b1baa76636f7; Type: FK CONSTRAINT; Schema: public; Owner: technical
--

ALTER TABLE ONLY public.sections
    ADD CONSTRAINT "FK_29fa67620fff739b1baa76636f7" FOREIGN KEY (board_id) REFERENCES public.boards(id);


--
-- TOC entry 2887 (class 2606 OID 16496)
-- Name: cards FK_d314a937c4659cf3b2088016930; Type: FK CONSTRAINT; Schema: public; Owner: technical
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT "FK_d314a937c4659cf3b2088016930" FOREIGN KEY (section_id) REFERENCES public.sections(id);


-- Completed on 2021-11-13 17:21:02 EST

--
-- PostgreSQL database dump complete
--

