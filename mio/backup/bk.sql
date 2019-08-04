PGDMP     %    *                w            donpapo    11.0    11.0                 0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                       false            !           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                       false            "           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                       false            #           1262    16723    donpapo    DATABASE     �   CREATE DATABASE donpapo WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'Spanish_Spain.1252' LC_CTYPE = 'Spanish_Spain.1252';
    DROP DATABASE donpapo;
          	   victordbu    false            �            1259    16752    bregando    TABLE     �   CREATE TABLE public.bregando (
    dueno_id integer NOT NULL,
    micro_empre_id integer NOT NULL,
    bregando_id integer NOT NULL
);
    DROP TABLE public.bregando;
       public      	   victordbu    false            �            1259    16765    bregando_bregando_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bregando_bregando_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.bregando_bregando_id_seq;
       public    	   victordbu    false    200            $           0    0    bregando_bregando_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.bregando_bregando_id_seq OWNED BY public.bregando.bregando_id;
            public    	   victordbu    false    201            �            1259    16726    dueno    TABLE     �  CREATE TABLE public.dueno (
    dueno_id integer NOT NULL,
    username character varying(64) NOT NULL,
    password character varying(64) NOT NULL,
    last_log date DEFAULT '2010-01-01'::date NOT NULL,
    first_log date DEFAULT '2010-01-01'::date NOT NULL,
    CONSTRAINT dueno_first_log_check CHECK ((first_log > '2009-12-31'::date)),
    CONSTRAINT dueno_last_log_check CHECK ((last_log > '2009-12-31'::date))
);
    DROP TABLE public.dueno;
       public      	   victordbu    false            �            1259    16724    dueno_dueno_id_seq    SEQUENCE     �   CREATE SEQUENCE public.dueno_dueno_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.dueno_dueno_id_seq;
       public    	   victordbu    false    197            %           0    0    dueno_dueno_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.dueno_dueno_id_seq OWNED BY public.dueno.dueno_id;
            public    	   victordbu    false    196            �            1259    16739    micro_empre    TABLE     k  CREATE TABLE public.micro_empre (
    micro_empre_id integer NOT NULL,
    nombre character varying(64) NOT NULL,
    revisado date DEFAULT '2010-01-01'::date NOT NULL,
    media_video_url character varying(64) NOT NULL,
    media_social_handle json NOT NULL,
    media_foto_url character varying(64)[] NOT NULL,
    que character varying(64)[] NOT NULL,
    donde character varying(64)[] NOT NULL,
    a_tu_casa boolean NOT NULL,
    nombre_que_vector tsvector NOT NULL,
    donde_vector tsvector NOT NULL,
    cuando json NOT NULL,
    CONSTRAINT micro_empre_revisado_check CHECK ((revisado > '2009-12-31'::date))
);
    DROP TABLE public.micro_empre;
       public      	   victordbu    false            �            1259    16737    micro_empre_micro_empre_id_seq    SEQUENCE     �   CREATE SEQUENCE public.micro_empre_micro_empre_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.micro_empre_micro_empre_id_seq;
       public    	   victordbu    false    199            &           0    0    micro_empre_micro_empre_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.micro_empre_micro_empre_id_seq OWNED BY public.micro_empre.micro_empre_id;
            public    	   victordbu    false    198            �
           2604    16767    bregando bregando_id    DEFAULT     |   ALTER TABLE ONLY public.bregando ALTER COLUMN bregando_id SET DEFAULT nextval('public.bregando_bregando_id_seq'::regclass);
 C   ALTER TABLE public.bregando ALTER COLUMN bregando_id DROP DEFAULT;
       public    	   victordbu    false    201    200            �
           2604    16729    dueno dueno_id    DEFAULT     p   ALTER TABLE ONLY public.dueno ALTER COLUMN dueno_id SET DEFAULT nextval('public.dueno_dueno_id_seq'::regclass);
 =   ALTER TABLE public.dueno ALTER COLUMN dueno_id DROP DEFAULT;
       public    	   victordbu    false    196    197    197            �
           2604    16743    micro_empre micro_empre_id    DEFAULT     �   ALTER TABLE ONLY public.micro_empre ALTER COLUMN micro_empre_id SET DEFAULT nextval('public.micro_empre_micro_empre_id_seq'::regclass);
 I   ALTER TABLE public.micro_empre ALTER COLUMN micro_empre_id DROP DEFAULT;
       public    	   victordbu    false    199    198    199                      0    16752    bregando 
   TABLE DATA               I   COPY public.bregando (dueno_id, micro_empre_id, bregando_id) FROM stdin;
    public    	   victordbu    false    200   -$                 0    16726    dueno 
   TABLE DATA               R   COPY public.dueno (dueno_id, username, password, last_log, first_log) FROM stdin;
    public    	   victordbu    false    197   w$                 0    16739    micro_empre 
   TABLE DATA               �   COPY public.micro_empre (micro_empre_id, nombre, revisado, media_video_url, media_social_handle, media_foto_url, que, donde, a_tu_casa, nombre_que_vector, donde_vector, cuando) FROM stdin;
    public    	   victordbu    false    199   %       '           0    0    bregando_bregando_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.bregando_bregando_id_seq', 13, true);
            public    	   victordbu    false    201            (           0    0    dueno_dueno_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.dueno_dueno_id_seq', 14, true);
            public    	   victordbu    false    196            )           0    0    micro_empre_micro_empre_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.micro_empre_micro_empre_id_seq', 12, true);
            public    	   victordbu    false    198            �
           2606    16769    bregando bregando_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.bregando
    ADD CONSTRAINT bregando_pkey PRIMARY KEY (bregando_id);
 @   ALTER TABLE ONLY public.bregando DROP CONSTRAINT bregando_pkey;
       public      	   victordbu    false    200            �
           2606    16732    dueno dueno_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.dueno
    ADD CONSTRAINT dueno_pkey PRIMARY KEY (dueno_id);
 :   ALTER TABLE ONLY public.dueno DROP CONSTRAINT dueno_pkey;
       public      	   victordbu    false    197            �
           2606    16734    dueno dueno_username_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.dueno
    ADD CONSTRAINT dueno_username_key UNIQUE (username);
 B   ALTER TABLE ONLY public.dueno DROP CONSTRAINT dueno_username_key;
       public      	   victordbu    false    197            �
           2606    16751    micro_empre micro_empre_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.micro_empre
    ADD CONSTRAINT micro_empre_pkey PRIMARY KEY (micro_empre_id);
 F   ALTER TABLE ONLY public.micro_empre DROP CONSTRAINT micro_empre_pkey;
       public      	   victordbu    false    199            �
           1259    24967    donde_vector_idx    INDEX     N   CREATE INDEX donde_vector_idx ON public.micro_empre USING gin (donde_vector);
 $   DROP INDEX public.donde_vector_idx;
       public      	   victordbu    false    199            �
           1259    24966    nombre_que_vector_idx    INDEX     X   CREATE INDEX nombre_que_vector_idx ON public.micro_empre USING gin (nombre_que_vector);
 )   DROP INDEX public.nombre_que_vector_idx;
       public      	   victordbu    false    199            �
           2606    16755    bregando bregando_dueno_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.bregando
    ADD CONSTRAINT bregando_dueno_id_fkey FOREIGN KEY (dueno_id) REFERENCES public.dueno(dueno_id);
 I   ALTER TABLE ONLY public.bregando DROP CONSTRAINT bregando_dueno_id_fkey;
       public    	   victordbu    false    197    200    2708            �
           2606    16760 %   bregando bregando_micro_empre_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.bregando
    ADD CONSTRAINT bregando_micro_empre_id_fkey FOREIGN KEY (micro_empre_id) REFERENCES public.micro_empre(micro_empre_id);
 O   ALTER TABLE ONLY public.bregando DROP CONSTRAINT bregando_micro_empre_id_fkey;
       public    	   victordbu    false    2713    199    200               :   x�ʹ�@A{���ȅ��`��ژT���U�6���h�W�9�{mr�8�]�~F�	-         �   x�u��
�0E�o�%#ik��e/E�
������8t=�!���������'zciY�UXԆ�0�Q1r�	Ψe�א�8�p��A^�	����;�D+�(�F�Ӹ�	��xv�U��g�S��8�ߪ���"��9�         �  x��WYo�H~V~�@/zQK>�Xl[`t{�Y-F�ĚX�Qu8u����ȑd��d�4'��G~���2�.U��he�iD��z״���I��x2=�ϼ�m�fuzzuuu��]�%�$��*��~Tի_��y��y���d�|?���罴�&l�u]�f��smp�Un�x�<�x!f��{ߖ2\&�2�Я�Q��f��Tc��-k�V4��-M�NgVH�ji��[�MeXk�Z�u'3�ݻ�w$XE$�`5�V�D0�m����B����L����Vg" 3��R��`C�d�d	Kt���7���K�����V��S�h�_ldҏ2K���ͽJV����[i2K�M�'����D���v���^����u���J69�B�vТ�
A����Q���/`+��g��l2�6syrY�	ڛ���E��ne�v%MEZ(i�"�f�j�.�YcN/�o@�Nv��*�J��1U�4M��b]�G
�Z/`U#���"�� �pF��#c�$T�0�1�0���ٙ������8c��3�c��0����c6G%w�Q�/>^�����z������;��
�߹��������ടqd���}R���p)�F�XH$Sh�/����W��U����l�i��:����j���F�K㇐�����<�g|�L���5;�gEK ��0+ai#4�����+:݈�HseŅ���V��|G�#���>�=]�]���z�s�ƒD�$O�t��i����8��|1Y���"Ƞ��.��t�v5�9��Nя�]b���.�Z�ڀ,֩�!��&�P�_�M��R5�e:�.���u��7�J�l��Xe"m'Kk�r$m����ⱌ2�х
��)N!6P`�K�͙�������P�$�r�E`2A9q0���!2�� �3XR�6���C.�Y'�BdJ���>Җh���������9���x��á2��H�Q�o������J2��ᰄ�ϥ�yP5�:P���u�����֭j�Ubo����
���+#|��'�G��$�V�U��3�6q��i�`���ʁ��� ��z+�I'l}�ǘV��b)��0�C>"�|�� �ȳmm�Q�"������6nF,/PlD��h���82v�����3�Ti�vh9��ut��*�F�Ʃ\��j�	%d(]b���8��)QqW��5����r/�f�<챢��V������K�.ͩG3Y��Z��ӓe�a3�|�o&�O�����K��v���S��6�q��4�ɔ�9�����ި$A��Yە�;U'4�f�ډVs�ݒ�h^�4�)�6�<��ɭ��� ?ýZ�l	[w�:L�sv%�_r�MH
���h�s�����ؕ}R�P�F�)M�h��[�����2���C�E��6�5\ّsl�k�{�s�B�H�9j��G�S�/��<V����������������\�1DHN����9-?��h�'�$&,c�F��l��&r�@�hq3�f]��&�]�m�)���Ԧ9S}%q�@3nbp��Ԣ��n�C�����k�Ƶl�<�u��/4�y�[5���t��s/��x|x	�,QLaiC/�{������������U���p���_ĕR���qAqc�{[j��T� �ЪD�����m����i���|�:�������$�`p N4rK9�ͫ��Κ��U�)���B�~�}z)�~�܅C����(C�C.���۾�bJ��8ٮ$�x�TP�|
�?�������R�     