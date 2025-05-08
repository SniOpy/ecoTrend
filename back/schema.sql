--
-- PostgreSQL database dump
--

-- Dumped from database version 14.17 (Ubuntu 14.17-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.17 (Ubuntu 14.17-0ubuntu0.22.04.1)

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
-- Name: category; Type: TABLE; Schema: public; Owner: bernardo
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name_category character varying(42) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.category OWNER TO bernardo;

--
-- Name: category_id_seq; Type: SEQUENCE; Schema: public; Owner: bernardo
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
-- Name: order_table; Type: TABLE; Schema: public; Owner: bernardo
--

CREATE TABLE public.order_table (
    id integer NOT NULL,
    lastname character varying(100) NOT NULL,
    firstname character varying(100) NOT NULL,
    items jsonb NOT NULL,
    address text NOT NULL,
    address_complement text,
    city character varying(100) NOT NULL,
    zipcode character varying(20) NOT NULL,
    country character varying(100) NOT NULL,
    delivery_method character varying(50) NOT NULL,
    payment_method character varying(50) NOT NULL,
    total_price numeric(10,2) NOT NULL,
    status_order character varying(42) NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone
);


ALTER TABLE public.order_table OWNER TO bernardo;

--
-- Name: order_table_id_seq; Type: SEQUENCE; Schema: public; Owner: bernardo
--

CREATE SEQUENCE public.order_table_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_table_id_seq OWNER TO bernardo;

--
-- Name: order_table_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bernardo
--

ALTER SEQUENCE public.order_table_id_seq OWNED BY public.order_table.id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: bernardo
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


ALTER TABLE public.product OWNER TO bernardo;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: bernardo
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
-- Name: user; Type: TABLE; Schema: public; Owner: bernardo
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


ALTER TABLE public."user" OWNER TO bernardo;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: bernardo
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
-- Name: order_table id; Type: DEFAULT; Schema: public; Owner: bernardo
--

ALTER TABLE ONLY public.order_table ALTER COLUMN id SET DEFAULT nextval('public.order_table_id_seq'::regclass);


--
-- Name: category category_pkey; Type: CONSTRAINT; Schema: public; Owner: bernardo
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT category_pkey PRIMARY KEY (id);


--
-- Name: order_table order_table_pkey; Type: CONSTRAINT; Schema: public; Owner: bernardo
--

ALTER TABLE ONLY public.order_table
    ADD CONSTRAINT order_table_pkey PRIMARY KEY (id);


--
-- Name: product product_pkey; Type: CONSTRAINT; Schema: public; Owner: bernardo
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT product_pkey PRIMARY KEY (id);


--
-- Name: user user_email_key; Type: CONSTRAINT; Schema: public; Owner: bernardo
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_email_key UNIQUE (email);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: public; Owner: bernardo
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

