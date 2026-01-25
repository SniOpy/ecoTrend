--
-- PostgreSQL database dump
--

\restrict YgzOrrbHGyfIOl3ouW03aLs2InhHDexJzjiMzceo2uy2fu1ZHFvyZi8rBLjxEqH

-- Dumped from database version 18.1 (Debian 18.1-1.pgdg12+2)
-- Dumped by pg_dump version 18.1 (Ubuntu 18.1-1.pgdg24.04+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: ecotrend_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO ecotrend_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: category; Type: TABLE; Schema: public; Owner: ecotrend_user
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name_category character varying(42) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.category OWNER TO ecotrend_user;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: ecotrend_user
--

ALTER TABLE public.category ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: order; Type: TABLE; Schema: public; Owner: ecotrend_user
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    status_order character varying(42) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public."order" OWNER TO ecotrend_user;

--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: ecotrend_user
--

ALTER TABLE public."order" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: product; Type: TABLE; Schema: public; Owner: ecotrend_user
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(42) NOT NULL,
    description text NOT NULL,
    price double precision NOT NULL,
    stock integer DEFAULT 0,
    image character varying(42) NOT NULL,
    category_id integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.product OWNER TO ecotrend_user;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: ecotrend_user
--

ALTER TABLE public.product ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user; Type: TABLE; Schema: public; Owner: ecotrend_user
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    firstname character varying(42) NOT NULL,
    lastname character varying(42) NOT NULL,
    email character varying(42) NOT NULL,
    user_password character varying(72) NOT NULL,
    role_user character varying(42),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public."user" OWNER TO ecotrend_user;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: ecotrend_user
--

ALTER TABLE public."user" ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: ecotrend_user
--

COPY public.category (id, name_category, created_at, updated_at) FROM stdin;
1	T-shirt	2026-01-25 01:09:03.320178+00	\N
2	Chaussures	2026-01-25 01:09:03.320178+00	\N
3	Jeans	2026-01-25 01:09:03.320178+00	\N
4	Accessoires	2026-01-25 01:09:03.320178+00	\N
5	Pulls	2026-01-25 01:09:03.320178+00	\N
\.


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: ecotrend_user
--

COPY public."order" (id, user_id, status_order, created_at, updated_at) FROM stdin;
1	1	en cours	2026-01-25 01:09:03.320178+00	\N
2	2	livrée	2026-01-25 01:09:03.320178+00	\N
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: ecotrend_user
--

COPY public.product (id, name, description, price, stock, image, category_id, created_at, updated_at) FROM stdin;
1	Jeans	Jean éco-lavé en coton recyclé, confortable et durable au quotidien.	59.99	10	jeans.png	3	2026-01-25 01:09:03.320178+00	\N
2	Sweater	Pull en lin naturel, léger, respirant et parfait pour la mi-saison.	21.99	5	sweater.png	5	2026-01-25 01:09:03.320178+00	\N
3	Chaussures	Sneakers unisexes en matériaux recyclés, à la fois stylées et responsables.	46.5	20	chaussures.png	2	2026-01-25 01:09:03.320178+00	\N
4	Casquette	Casquette minimaliste en toile de coton biologique non teintée.	21.99	20	casquette.png	4	2026-01-25 01:09:03.320178+00	\N
5	Tote	Sac fourre-tout en toile bio, solide et pratique pour vos essentiels.	45.99	20	tote.png	4	2026-01-25 01:09:03.320178+00	\N
6	Porte-feuille	Compact, léger et 100 % végétal, ce portefeuille en liège allie esthétique naturelle et durabilité.	18.75	20	porte-feuille.png	4	2026-01-25 01:09:03.320178+00	\N
7	Echarpe	Élégante et douce, cette écharpe en coton biologique offre confort et légèreté.	45.99	20	echarpe.png	4	2026-01-25 01:09:03.320178+00	\N
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: ecotrend_user
--

COPY public."user" (id, firstname, lastname, email, user_password, role_user, created_at, updated_at) FROM stdin;
1	Alice	Dupont	alice@example.com	$2b$12$ADELEKs6qc35c9Cr46SknuxDXVl59bDt30jSeJ07aVw3h/OM27OaC	admin	2026-01-25 01:09:03.320178+00	\N
2	Bob	Martin	bob@example.com	$2y$10$2lxnieqamoRxNRYep7Dtqe8sE3Fnm2v3.lhnzvk71k1tdKT2DLQ9q	user	2026-01-25 01:09:03.320178+00	\N
\.


--
-- Name: category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ecotrend_user
--

SELECT pg_catalog.setval('public.category_id_seq', 5, true);


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ecotrend_user
--

SELECT pg_catalog.setval('public.order_id_seq', 2, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ecotrend_user
--

SELECT pg_catalog.setval('public.product_id_seq', 7, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: ecotrend_user
--

SELECT pg_catalog.setval('public.user_id_seq', 2, true);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: ecotrend_user
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: ecotrend_user
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: ecotrend_user
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: ecotrend_user
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: ecotrend_user
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO ecotrend_user;


--
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO ecotrend_user;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO ecotrend_user;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TABLES TO ecotrend_user;


--
-- PostgreSQL database dump complete
--

\unrestrict YgzOrrbHGyfIOl3ouW03aLs2InhHDexJzjiMzceo2uy2fu1ZHFvyZi8rBLjxEqH

