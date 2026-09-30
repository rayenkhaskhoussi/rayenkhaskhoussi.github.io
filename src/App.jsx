import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Network,
  Server,
  ShieldCheck,
  Wifi,
  Star,
  Medal,
  Globe,
  Phone,
  Mail,
  Send,
  X,
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Code2,
  Wrench,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ---------- À personnaliser ---------- */
const PHOTO_SRC = "/rayen-photo.jpg"; // ex. "/photo.jpg" (dans /public). Vide = emplacement photo.
const EMAIL = "rayenkhaskhoussi30@gmail.com";
const PHONE = "+33 7 80 52 56 98";

const NAV = [
  ["Accueil", "accueil"],
  ["Compétences", "competences"],
  ["Projets", "projets"],
  ["Parcours", "parcours"],
  ["Contact", "contact"],
];
const SKILLS = [
  {
    icon: Network,
    title: "Réseaux & Commutation",
    items: [
      "Cisco",
      "MikroTik",
      "IPv4/IPv6",
      "VLAN",
      "DHCP",
      "VLSM",
      "Routage inter-VLAN",
      "Routage statique / dynamique",
    ],
  },
  {
    icon: Server,
    title: "Systèmes & Virtualisation",
    items: ["Linux Debian/Ubuntu", "Windows Server", "VMware", "VirtualBox"],
  },
  {
    icon: ShieldCheck,
    title: "Cybersécurité & Filtrage",
    items: ["ACLs", "SSH", "Analyse de vulnérabilités", "Durcissement réseau"],
  },
  {
    icon: Wifi,
    title: "Télécommunications",
    items: ["Fibre", "Wi-Fi 802.11", "ToIP/VoIP"],
  },
  {
    icon: Code2,
    title: "Développement & BDD",
    items: ["HTML5 / CSS3", "PHP", "SQL", "JavaScript"],
  },
  {
    icon: Wrench,
    title: "Outils & Méthodologie",
    items: [
      "Wireshark",
      "Cisco Packet Tracer",
      "Gantt & Trello",
      "Pack Office",
    ],
  },
];
const WORDS = [
  "Cisco",
  "MikroTik",
  "VLAN",
  "Wireshark",
  "SSH",
  "ACLs",
  "VMware",
  "Debian",
  "Packet Tracer",
];
/* ---------- Projets (images dans /public/projects/<id>/) ---------- */
const PROJECTS = [
  {
    id: "phare",
    n: "01",
    kicker: "Réseaux · Sécurité",
    title: "Projet Phare : Réseau Multi-Sites",
    lead: "Construction et sécurisation d'un réseau d'entreprise pour 4 sites distants.",
    parts: [
      [
        "Adressage & VLAN",
        "Plan d'adressage IPv4 optimisé, segmentation en VLAN Administratif, Commercial et Technique, routage inter-VLAN.",
      ],
      [
        "Routage & services",
        "Routeurs Cisco et MikroTik, pools DHCP par VLAN, DNS Bind9 et serveur web Apache2 en HTTPS.",
      ],
      [
        "Sécurité",
        "Durcissement SSH, ACLs étendues entre VLAN, règles de pare-feu et SNAT.",
      ],
    ],
    stats: [
      ["4", "sites distants"],
      ["3", "VLAN"],
      ["ACLs", "filtrage inter-VLAN"],
    ],
    tools: [
      "Cisco ISR4331",
      "MikroTik",
      "Packet Tracer",
      "Wireshark",
      "Trello",
    ],
    shots: [
      ["01_full_topology.png", "Topologie complète des 4 sites", "Topologie"],
      ["01_addressing_plan.png", "Plan d'adressage IPv4", "Adressage"],
      [
        "04_switch_vlan_creation.png",
        "Création des VLAN 10, 20 et 30 sur le switch",
        "VLAN",
      ],
      [
        "05_switch_access_trunk_ports.png",
        "Ports access et trunk du switch",
        "VLAN",
      ],
      [
        "02_mikrotik_vlan_interfaces.png",
        "Interfaces VLAN sur le MikroTik",
        "Routage",
      ],
      ["06_routing_table.png", "Table de routage", "Routage"],
      ["05_dhcp_pools.png", "Pools DHCP par VLAN", "Services"],
      ["09_bind9_dns_status.png", "Service DNS Bind9 actif", "Services"],
      [
        "08_apache2_https_status.png",
        "Serveur web Apache2 en HTTPS",
        "Services",
      ],
      ["07_extended_acls.png", "ACLs étendues entre les VLAN", "Sécurité"],
      [
        "10_snat_and_vlan_firewall_rules.png",
        "Règles de pare-feu et SNAT",
        "Sécurité",
      ],
      [
        "02_pdu_osi_layer_analysis.png",
        "Analyse d'un PDU couche par couche (modèle OSI)",
        "Tests",
      ],
      [
        "03_icmp_ping_successful.png",
        "Ping ICMP réussi vers le serveur externe",
        "Tests",
      ],
    ],
  },
  {
    id: "connecter",
    n: "02",
    kicker: "Câblage · Wi-Fi · Radio",
    title: "Mesures & Certification Réseau",
    lead: "Qualification d'un câble Cat 6A au Fluke DSX-602, cartographie Wi-Fi avec un ESP32, transmission FM et numérisation de signaux.",
    parts: [
      [
        "Certification RJ45 (SAE 13)",
        "Câble ACOME Cat 6A F/UTP : préparation depuis la documentation anglaise, configuration du certificateur, résultat PASS, puis recoupement à l'ohmmètre, au GBF et à l'oscilloscope.",
      ],
      [
        "Couverture Wi-Fi (SAE 22)",
        "Mesure du RSSI avec un ESP32 dans plusieurs salles, carte par zones : bon au-dessus de -70 dBm, dégradé jusqu'à -79 dBm, mort en dessous.",
      ],
      [
        "Transmission FM (R221)",
        "Émission autour de 888 MHz avec GNU Radio et ADALM-Pluto, largeur de bande cohérente avec la règle de Carson.",
      ],
      [
        "Numérisation (Python)",
        "Échantillonnage, quantification, bruit et repliement de spectre (théorème de Shannon).",
      ],
    ],
    stats: [
      ["PASS", "Cat 6A certifié"],
      ["12 dB", "atténuation d'un mur"],
      ["888 MHz", "émission FM"],
    ],
    tools: [
      "Fluke DSX-602",
      "LinkWare PC",
      "Oscilloscope",
      "ESP32",
      "GNU Radio",
      "ADALM-Pluto",
      "Python",
    ],
    shots: [
      [
        "01_cable_label_acome_cat6a.png",
        "Câble ACOME Cat 6A F/UTP testé",
        "Certification RJ45",
      ],
      [
        "04_datasheet_limits_table.png",
        "Limites de la datasheet : atténuation, NEXT, ACR…",
        "Certification RJ45",
      ],
      [
        "05_dsx602_project_configuration.png",
        "Configuration du DSX-602 (TIA Cat 6A Channel)",
        "Certification RJ45",
      ],
      [
        "06_cable_and_tester_setup.png",
        "Certificateur branché sur le câble",
        "Certification RJ45",
      ],
      [
        "08_pass_led_result.png",
        "LED PASS allumée sur l'unité distante",
        "Certification RJ45",
      ],
      [
        "10_linkware_report.png",
        "Rapport LinkWare PC : NEXT, ACR-F, affaiblissement, longueur",
        "Certification RJ45",
      ],
      [
        "11_insertion_loss_curve.png",
        "Affaiblissement en fonction de la fréquence",
        "Certification RJ45",
      ],
      [
        "12_acrf_crosstalk_curve.png",
        "ACR-F : les paires 4-5 approchent la limite vers 250 MHz",
        "Certification RJ45",
      ],
      [
        "13_sketch_attenuation_setup.png",
        "Schéma de câblage dessiné avant la mesure",
        "Mesures manuelles",
      ],
      [
        "14_sketch_ohmmeter_loop_resistance.png",
        "Schéma de la mesure de résistance de boucle",
        "Mesures manuelles",
      ],
      [
        "15_bench_setup_gbf_oscilloscope.png",
        "Banc de mesure : GBF, oscilloscope et câble",
        "Mesures manuelles",
      ],
      [
        "16_oscilloscope_propagation_delay.png",
        "Retard de propagation à 1 MHz pour calculer la longueur",
        "Mesures manuelles",
      ],
      [
        "01_theoretical_isosignal_sketch.png",
        "Schéma théorique de la surface iso-puissance",
        "Wi-Fi ESP32",
      ],
      [
        "02_wifi_power_map_dbm.png",
        "Carte des salles avec valeurs en dBm et zones de couverture",
        "Wi-Fi ESP32",
      ],
      ["01_adalm_pluto_setup.png", "ADALM-Pluto relié au PC", "Radio FM"],
      [
        "02_fm_spectrum_888mhz.png",
        "Spectre et cascade du signal FM à 888 MHz",
        "Radio FM",
      ],
      [
        "03_receiver_time_sink_triangle.png",
        "Signal triangulaire reçu : la transmission fonctionne",
        "Radio FM",
      ],
      [
        "05_aliasing_spectrum.png",
        "Repliement de spectre : fe = 8000 Hz, Nyquist à 4000 Hz",
        "Numérisation",
      ],
      [
        "04_quantization_q05.png",
        "Signal original et signal quantifié (pas de 0,5)",
        "Numérisation",
      ],
    ],
  },
  {
    id: "dev",
    n: "03",
    kicker: "Développement · Données",
    title: "NetShop & Collecte de données Vélo",
    lead: "Une application web PHP/MySQL de vente de matériel réseau, et un script Python qui collecte les données de l'API open-data de Montpellier.",
    parts: [
      [
        "NetShop (SAE 2.3)",
        "Application HTML/CSS/PHP/MySQL réalisée en binôme : rôles admin et client, CRUD des équipements, mots de passe hachés, requêtes préparées PDO, déploiement en SFTP.",
      ],
      [
        "Collecte vélo (SAE 1.5)",
        "Script Python: Collecte automatique des données de l’API, horodatage et versionnement des relevés sur GitHub.",
      ],
      [
        "Chaîne IoT (SAE 2.4)",
        "Capteur LoRaWAN, TTN, MQTT, Telegraf puis InfluxDB pour suivre les températures.",
      ],
    ],
    stats: [
      ["6", "tables MySQL"],
      ["2", "rôles : admin / client"],
      ["200", "statut HTTP contrôlé"],
    ],
    tools: ["PHP", "MySQL", "Python", "GitHub", "InfluxDB", "FileZilla"],
    shots: [
      ["01_homepage.png", "Page d'accueil de NetShop", "NetShop"],
      [
        "02_add_equipment_form.png",
        "Formulaire admin d'ajout d'équipement",
        "NetShop",
      ],
      [
        "03_phpmyadmin_tables.png",
        "Modèle de données dans phpMyAdmin",
        "NetShop",
      ],
      [
        "05_debug_error_message.png",
        "Débogage : PDOException, table `equipement` corrigée en `equipements`",
        "NetShop",
      ],
      [
        "11_header_admin.png",
        "Barre de navigation d'un administrateur",
        "NetShop",
      ],
      [
        "13_filezilla_deployment.png",
        "Déploiement SFTP sur le serveur de l'université",
        "NetShop",
      ],
      [
        "01_github_repo_velo_collect.png",
        "Dépôt GitHub du script de collecte",
        "Collecte vélo",
      ],
      [
        "02_repo_structure_workflows_velo_data.png",
        "Structure du dépôt avec workflow automatisé",
        "Collecte vélo",
      ],
      [
        "03_velo_data_daily_json.png",
        "Données collectées, un dossier par jour",
        "Collecte vélo",
      ],
      [
        "07_parking_json_structure.png",
        "Structure du JSON renvoyé par l'API",
        "Collecte vélo",
      ],
      [
        "01_influxdb_sensor_data.png",
        "Températures du capteur ERS2-04 dans InfluxDB",
        "Chaîne IoT",
      ],
    ],
  },
];

/* Visionneuse plein écran (Échap, flèches ← →) */
function Lightbox({ box, setBox }) {
  const { list, i } = box;
  const s = list[i];
  const fig = useRef(null);
  const step = (d) => setBox({ list, i: (i + d + list.length) % list.length });
  useEffect(() => {
    const k = (e) => {
      if (e.key === "Escape") setBox(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    gsap.fromTo(
      fig.current,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" },
    );
    return () => {
      window.removeEventListener("keydown", k);
      document.body.style.overflow = "";
    };
  }, [i]);
  const nav = (d) => (e) => {
    e.stopPropagation();
    step(d);
  };
  return (
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      onClick={() => setBox(null)}
    >
      <button className="lb__x" aria-label="Fermer">
        <X size={20} />
      </button>
      <button
        className="lb__nav lb__nav--l"
        onClick={nav(-1)}
        aria-label="Précédent"
      >
        <ArrowLeft size={20} />
      </button>
      <figure ref={fig} onClick={(e) => e.stopPropagation()}>
        <img src={s.src} alt={s.cap} />
        <figcaption>
          <span>{s.tag}</span>
          {s.cap}
          <em>
            {i + 1} / {list.length}
          </em>
        </figcaption>
      </figure>
      <button
        className="lb__nav lb__nav--r"
        onClick={nav(1)}
        aria-label="Suivant"
      >
        <ArrowRight size={20} />
      </button>
    </div>
  );
}
const FORMATION = [
  [
    "Depuis sept. 2026",
    "B.U.T. Réseaux et Télécommunications",
    "IUT de Blagnac",
    "Administration réseaux, cybersécurité, télécommunications, anglais technique.",
    "/logos/iut-blagnac.png",
  ],
  [
    "2025 – 2026",
    "B.U.T. Réseaux et Télécommunications",
    "IUT de Béziers",
    "Projet : construction et sécurisation d'un réseau multi-sites d'entreprise.",
    "/logos/iut-beziers.png",
  ],
  [
    "Juin 2025",
    "Baccalauréat Tunisien sportif",
    "Lycée sportif tunisien, Tunis",
    "",
  ],
  [
    "Juin 2024",
    "Baccalauréat Français",
    "Tunis (candidat libre)",
    "Spécialités Mathématiques & NSI (Numérique et Sciences Informatiques).",
  ],
];

/* Découpe le texte en lettres masquées pour l'animation */
const Split = ({ text, className = "" }) => (
  <span className={`split ${className}`} aria-label={text}>
    {text.split(" ").map((w, i) => (
      <span className="w" key={i} aria-hidden="true">
        {[...w].map((c, j) => (
          <span className="ch" key={j}>
            <i>{c}</i>
          </span>
        ))}
      </span>
    ))}
  </span>
);

const go = (id) => (e) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function App() {
  const root = useRef(null);
  const [box, setBox] = useState(null);

  useLayoutEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const off = [];
    const ctx = gsap.context(() => {
      if (reduce) return gsap.set(".intro", { display: "none" });

      /* ===== INTRO : un réseau qui s'initialise ===== */
      document.body.style.overflow = "hidden";
      gsap.set(".hero .ch i, .intro__name .ch i", { yPercent: 110 });
      gsap.set(".photo-ring, .navbar, .hero__fade", { autoAlpha: 0 });
      gsap.set(".hero__fade", { y: 24 });
      gsap.set(".pop", { autoAlpha: 0 });

      const c = { v: 0 };
      const cnt = root.current.querySelector(".count");
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          document.body.style.overflow = "";
          ScrollTrigger.refresh();
        },
      });
      tl.to(
        ".link",
        { strokeDashoffset: 0, duration: 0.45, stagger: 0.2, ease: "none" },
        0.1,
      )
        .from(
          ".node",
          { scale: 0, duration: 0.5, stagger: 0.2, ease: "back.out(3)" },
          0.1,
        )
        .to(
          c,
          {
            v: 100,
            duration: 2.4,
            ease: "power2.inOut",
            onUpdate: () =>
              (cnt.textContent = String(Math.round(c.v)).padStart(3, "0")),
          },
          0,
        )
        .to(
          ".packet",
          {
            keyframes: [
              { attr: { cx: 230, cy: 140 } },
              { attr: { cx: 400, cy: 240 } },
              { attr: { cx: 560, cy: 110 } },
              { attr: { cx: 710, cy: 270 } },
            ],
            duration: 2.2,
            ease: "none",
          },
          0.3,
        )
        .to(
          ".intro__name .ch i",
          { yPercent: 0, stagger: 0.03, duration: 0.8 },
          1.6,
        )
        .to(
          ".intro__net, .intro__name, .intro__meta",
          { autoAlpha: 0, duration: 0.4 },
          "+=0.45",
        )
        .to(".intro__panel.top", {
          yPercent: -100,
          duration: 1.1,
          ease: "expo.inOut",
        })
        .to(
          ".intro__panel.bottom",
          { yPercent: 100, duration: 1.1, ease: "expo.inOut" },
          "<",
        )
        .set(".intro", { display: "none" })
        .to(".navbar", { autoAlpha: 1, duration: 0.6 }, "-=0.55")
        .to(
          ".hero .ch i",
          { yPercent: 0, stagger: 0.04, duration: 1.2, ease: "expo.out" },
          "<",
        )
        .fromTo(
          ".photo-ring",
          { scale: 0.7, rotate: -25 },
          {
            scale: 1,
            rotate: 0,
            autoAlpha: 1,
            duration: 1.4,
            ease: "expo.out",
          },
          "<0.15",
        )
        .to(
          ".hero__fade",
          { autoAlpha: 1, y: 0, stagger: 0.1, duration: 0.8 },
          "<0.4",
        );

      /* ===== SCROLL ===== */
      gsap.to(".progress", {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });

      gsap.to(".hero__photo", {
        yPercent: -14,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray(".rv").forEach((el) =>
        gsap.from(el.querySelectorAll(".ch i"), {
          yPercent: 110,
          stagger: 0.02,
          duration: 0.9,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        }),
      );

      ScrollTrigger.batch(".pop", {
        start: "top 90%",
        onEnter: (b) =>
          gsap.fromTo(
            b,
            { y: 60, rotate: 2, autoAlpha: 0 },
            {
              y: 0,
              rotate: 0,
              autoAlpha: 1,
              stagger: 0.12,
              duration: 0.9,
              ease: "power3.out",
            },
          ),
      });

      // Bande de mots : défile en continu, accélère avec le scroll
      const mq = gsap.to(".marquee__track", {
        xPercent: -50,
        duration: 26,
        ease: "none",
        repeat: -1,
      });
      ScrollTrigger.create({
        onUpdate: (s) =>
          mq.timeScale(s.direction * (1 + Math.abs(s.getVelocity()) / 250)),
      });
      const settle = () =>
        mq.timeScale(
          gsap.utils.interpolate(
            mq.timeScale(),
            Math.sign(mq.timeScale()) || 1,
            0.06,
          ),
        );
      gsap.ticker.add(settle);
      off.push(() => gsap.ticker.remove(settle));

      // Le projet s'ouvre en plein écran pendant le scroll
      gsap.fromTo(
        ".projects",
        { clipPath: "inset(7% 5% 7% 5% round 44px)" },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          ease: "none",
          scrollTrigger: {
            trigger: ".projects-wrap",
            start: "top 85%",
            end: "top 10%",
            scrub: true,
          },
        },
      );

      const rf = () => ScrollTrigger.refresh();
      window.addEventListener("load", rf);
      off.push(() => window.removeEventListener("load", rf));

      gsap.fromTo(
        ".tl-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline",
            start: "top 80%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );

      // Boutons magnétiques
      root.current.querySelectorAll(".mag").forEach((el) => {
        const mv = (e) => {
          const r = el.getBoundingClientRect();
          gsap.to(el, {
            x: (e.clientX - r.left - r.width / 2) * 0.35,
            y: (e.clientY - r.top - r.height / 2) * 0.35,
            duration: 0.4,
          });
        };
        const lv = () =>
          gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.9,
            ease: "elastic.out(1,0.4)",
          });
        el.addEventListener("mousemove", mv);
        el.addEventListener("mouseleave", lv);
        off.push(() => {
          el.removeEventListener("mousemove", mv);
          el.removeEventListener("mouseleave", lv);
        });
      });
    }, root);

    return () => {
      off.forEach((f) => f());
      ctx.revert();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div ref={root}>
      {/* INTRO */}
      <div className="intro" aria-hidden="true">
        <div className="intro__panel top" />
        <div className="intro__panel bottom" />
        <svg className="intro__net" viewBox="0 0 800 400">
          {[
            "M90 310L230 140",
            "M230 140L400 240",
            "M400 240L560 110",
            "M560 110L710 270",
            "M400 240L710 270",
            "M230 140L400 60",
            "M400 60L560 110",
          ].map((d) => (
            <path className="link" d={d} pathLength="1" key={d} />
          ))}
          {[
            [90, 310],
            [230, 140],
            [400, 240],
            [560, 110],
            [710, 270],
            [400, 60],
          ].map(([x, y]) => (
            <circle className="node" cx={x} cy={y} r="9" key={x + "-" + y} />
          ))}
          <circle className="packet" cx="90" cy="310" r="5" />
        </svg>
        <Split className="intro__name" text="RAYEN KHASKHOUSSI" />
        <div className="intro__meta">
          <span>Initialisation du réseau…</span>
          <b className="count">000</b>
        </div>
      </div>

      <div className="progress" />
      <header className="navbar">
        <div className="container navbar__inner">
          <a href="#accueil" className="logo" onClick={go("accueil")}>
            Rayen Khaskhoussi
          </a>
          <nav className="navbar__links" aria-label="Navigation principale">
            {NAV.map(([l, id]) => (
              <a key={id} href={`#${id}`} onClick={go(id)}>
                {l}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="accueil" className="hero">
          <div className="container hero__grid">
            <div>
              <h1 className="hero__name">
                <Split text="Rayen" />
                <Split text="Khaskhoussi" />
              </h1>
              <h2 className="hero__role hero__fade">
                Cybersécurité &amp; Réseaux
              </h2>
              <p className="hero__fade hero__text">
                Titulaire d'un double baccalauréat, en deuxième année de B.U.T.
                Réseaux et Télécommunications (parcours Cybersécurité), je
                recherche un stage de 2 mois mêlant développement web,
                déploiement et gouvernance numérique. J'ai développé une
                application PHP/MySQL et mis en place des services Linux (DNS,
                HTTPS, SSH). Curieux et autonome, j'utilise l'IA comme outil de
                travail. Disponible du 19 avril au 11 juin.
              </p>
            </div>
            <div className="hero__photo">
              <div className="photo-ring">
                <div className="photo-inner">
                  {PHOTO_SRC ? (
                    <img src={PHOTO_SRC} alt="Rayen Khaskhoussi" />
                  ) : (
                    <span>Photo</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true">
          <div className="marquee__track">
            {[0, 1].map((k) => (
              <div className="marquee__set" key={k}>
                {WORDS.map((w) => (
                  <span key={w}>{w}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* COMPÉTENCES */}
        <section id="competences" className="section">
          <div className="container">
            <div className="head">
              <h2>
                <Split className="rv" text="Compétences techniques" />
              </h2>
              <p>
                Expertise technique acquise via ma formation et mes projets
                pratiques en environnement simulé et réel.
              </p>
            </div>
            <div className="skills">
              {SKILLS.map(({ icon: Icon, title, items }) => (
                <article className="card skill pop" key={title}>
                  <div>
                    <span className="ic">
                      <Icon size={20} />
                    </span>
                    <h3>{title}</h3>
                  </div>
                  <ul className="chips">
                    {items.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROJETS */}
        <section id="projets" className="projects-wrap">
          <div className="projects">
            <div className="container">
              <div className="head">
                <h2>
                  <Split className="rv" text="Mes projets" />
                </h2>
                <p>
                  Trois projets menés pendant ma formation : réseau
                  d'entreprise, mesures et certification, développement et
                  données. Cliquez sur une image pour l'agrandir.
                </p>
              </div>
              {PROJECTS.map((p) => {
                const list = p.shots.map(([f, cap, tag]) => ({
                  src: `/projects/${p.id}/${f}`,
                  cap,
                  tag,
                }));
                return (
                  <article className="proj" key={p.id}>
                    <div className="proj__info">
                      <span className="proj__n">{p.n}</span>
                      <p className="proj__kicker">{p.kicker}</p>
                      <h3>
                        <Split className="rv" text={p.title} />
                      </h3>
                      <p className="proj__lead">{p.lead}</p>
                      <ul className="parts">
                        {p.parts.map(([t, d]) => (
                          <li key={t}>
                            <b>{t}</b>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="stats">
                        {p.stats.map(([v, l]) => (
                          <div key={l}>
                            <strong>{v}</strong>
                            <span>{l}</span>
                          </div>
                        ))}
                      </div>
                      <div className="tags">
                        {p.tools.map((t) => (
                          <span className="tag" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="shots">
                      {list.map((s, i) => (
                        <button
                          className="shot pop"
                          key={s.src}
                          onClick={() => setBox({ list, i })}
                          aria-label={`Agrandir : ${s.cap}`}
                        >
                          <span className="shot__img">
                            <img src={s.src} alt={s.cap} />
                            <Maximize2 size={14} />
                          </span>
                          <span className="shot__cap">
                            <small>{s.tag}</small>
                            {s.cap}
                          </span>
                        </button>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* PARCOURS */}
        <section id="parcours" className="section">
          <div className="container">
            <div className="head">
              <h2>
                <Split className="rv" text="Parcours & Atouts" />
              </h2>
              <p>
                Une formation rigoureuse complétée par une discipline
                personnelle forte.
              </p>
            </div>
            <div className="parcours">
              <div>
                <h3 className="sub">Formation</h3>
                <ol className="timeline">
                  <span className="tl-line" />
                  {FORMATION.map(([date, t, place, desc, logo]) => (
                    <li key={date}>
                      <div className="tl-body">
                        <time>{date}</time>
                        <h4>{t}</h4>
                        <p className="tl-place">{place}</p>
                        {desc && <p>{desc}</p>}
                      </div>
                      {logo && (
                        <img
                          className="tl-logo"
                          src={logo}
                          alt={`Logo ${place}`}
                        />
                      )}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="atouts">
                <article className="card card--ink pop">
                  <div className="card__head">
                    <span className="ic">
                      <Star size={20} />
                    </span>
                    <h3>Atouts Professionnels</h3>
                  </div>
                  <ul className="dots">
                    {[
                      "Organisé",
                      "Curieux",
                      "Autonome",
                      "Rigueur",
                      "Discipline",
                    ].map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </article>
                <div className="row">
                  <article className="card pop">
                    <div className="card__head">
                      <span className="ic">
                        <Medal size={20} />
                      </span>
                      <h3>Centres d'intérêt</h3>
                    </div>
                    <ul className="dots">
                      <li>Judo (Ceinture Noire 1er Dan)</li>
                      <li>Basketball</li>
                      <li>
                        Lecture : science-fiction et romans d'anticipation,
                        notamment Fondation d'Isaac Asimov
                      </li>
                    </ul>
                  </article>
                  <article className="card pop">
                    <div className="card__head">
                      <span className="ic">
                        <Globe size={20} />
                      </span>
                      <h3>Langues</h3>
                    </div>
                    <ul className="dots dots--lang">
                      <li>
                        Français <span className="level">C1</span>
                      </li>
                      <li>
                        Anglais <span className="level">B2</span>
                      </li>
                    </ul>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact">
          <div className="container">
            <h2>
              <Split className="rv" text="Discutons de mon stage" />
            </h2>
            <p>
              Je suis disponible pour un stage de 2 mois, du 19 avril au 11
              juin. Basé à Toulouse (20 ans, Permis B, Non véhiculé).
            </p>
            <div className="contact__box">
              <a href={`tel:${PHONE.replace(/\s/g, "")}`}>
                <Phone size={18} /> {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`}>
                <Mail size={18} /> {EMAIL}
              </a>
            </div>
            <div className="cta cta--center">
              <a href={`mailto:${EMAIL}`} className="btn btn--p mag">
                <Send size={16} /> Envoyer un Email
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <div className="footer__brand">
            <strong>Rayen Khaskhoussi</strong>
            <span>Cybersécurité &amp; Réseaux</span>
          </div>
          <nav className="footer__links" aria-label="Pied de page">
            {NAV.map(([l, id]) => (
              <a key={id} href={`#${id}`} onClick={go(id)}>
                {l}
              </a>
            ))}
          </nav>
          <div className="footer__social">
            <a href={`mailto:${EMAIL}`} aria-label="Email">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
      {box && <Lightbox box={box} setBox={setBox} />}
    </div>
  );
}
