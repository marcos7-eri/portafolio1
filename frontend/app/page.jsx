'use client';

import {useEffect, useState} from 'react';

const defaultProfile = {
  name:'Erik Salvatierra Choque', age:21, birthYear:2005, role:'Desarrollador web', location:'Bolivia',
  availability:'Disponible para colaborar',
  introduction:'Me gusta transformar ideas en productos digitales útiles, claros y fáciles de usar.',
  skills:['Next.js','NestJS','TypeScript','SQLite','Docker','Terraform']
};

export default function Home() {
  const [profile, setProfile] = useState(defaultProfile);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({name:'',email:'',message:''});
  const [feedback, setFeedback] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch('/api/profile').then(r => {if(!r.ok) throw Error(); return r.json();}),
      fetch('/api/projects').then(r => {if(!r.ok) throw Error(); return r.json();})
    ]).then(([person, items]) => {setProfile(person); setProjects(items);})
      .catch(() => setFeedback('No se pudo cargar el contenido. Intenta actualizar la página.'))
      .finally(() => setLoading(false));
  }, []);

  async function sendMessage(event) {
    event.preventDefault(); setSending(true); setFeedback('');
    try {
      const response = await fetch('/api/contact', {method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});
      if (!response.ok) throw Error('Revisa los datos del formulario.');
      setForm({name:'',email:'',message:''}); setFeedback('¡Mensaje enviado! Gracias por escribirme.');
    } catch (error) { setFeedback(error.message || 'No se pudo enviar el mensaje.'); }
    finally {setSending(false);}
  }

  return <>
    <header className="site-header">
      <div className="wrap header-inner">
        <a href="#inicio" className="brand" aria-label="Ir al inicio"><span className="brand-mark">ES<span>.</span></span><span className="brand-name">ERIK SALVATIERRA</span></a>
        <nav aria-label="Navegación principal"><a href="#sobre-mi">Sobre mí</a><a href="#proyectos">Proyectos</a><a href="#habilidades">Habilidades</a><a className="nav-contact" href="#contacto">Hablemos <span aria-hidden="true">↗</span></a></nav>
      </div>
    </header>

    <main id="inicio">
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="pulse"/> {profile.availability}</div>
          <p className="hero-overline">HOLA, SOY ERIK <span className="slash">/</span> PORTAFOLIO 2026</p>
          <h1 id="hero-title">Ideas que se<br/><em>vuelven</em> <span>realidad.</span></h1>
          <p className="hero-lead">{profile.introduction} Diseño y desarrollo experiencias web de principio a fin.</p>
          <div className="hero-actions"><a className="button button-primary" href="#proyectos">Explorar proyectos <span aria-hidden="true">↗</span></a><a className="button button-secondary" href="#contacto">Contactarme</a></div>
          <div className="hero-meta"><div><strong>01</strong><span>Enfoque en<br/>soluciones reales</span></div><div><strong>02</strong><span>Frontend +<br/>backend</span></div><div><strong>03</strong><span>Aprender y<br/>crear siempre</span></div></div>
        </div>
        <div className="hero-art" aria-label="Ilustración gráfica con las iniciales de Erik Salvatierra"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="art-card"><div className="art-top"><span>DESARROLLO / DISEÑO</span><span>01 — 03</span></div><div className="art-initials">E<span>S</span><b>.</b></div><div className="art-bottom"><span>CREAR <i>↗</i></span><span>DESDE BOLIVIA</span></div></div><div className="floating-note">Pensar<span>↗</span><br/>Construir<span>↗</span><br/>Mejorar<span>↗</span></div></div>
        <div className="scroll-cue">DESLIZA PARA EXPLORAR <span>↓</span></div>
      </section>

      <section className="about section" id="sobre-mi"><div className="wrap about-grid"><div><p className="section-kicker">01 / SOBRE MÍ</p><h2>Curiosidad por<br/><em>crear cosas</em><br/>que importan.</h2></div><div className="about-content"><p>Soy <strong>{profile.name}</strong>, tengo {profile.age} años y nací en {profile.birthYear}. Me interesa construir productos digitales que combinen una interfaz cuidada con una base técnica sólida.</p><p>Trabajo con herramientas de frontend, backend y bases de datos. Disfruto aprender, experimentar y convertir problemas cotidianos en soluciones web sencillas.</p><div className="about-facts"><div><span>UBICACIÓN</span><strong>{profile.location}</strong></div><div><span>ENFOQUE</span><strong>Desarrollo web</strong></div></div></div></div></section>

      <section className="projects section" id="proyectos"><div className="wrap"><div className="section-heading"><div><p className="section-kicker">02 / TRABAJO SELECCIONADO</p><h2>Proyectos<span className="accent">.</span></h2></div><p>Una selección de productos y conceptos que muestran cómo pienso, diseño y desarrollo.</p></div><div className="project-grid" aria-live="polite">{projects.map((project,index)=><article className={`project-card project-${index+1}`} key={project.id}><div className="project-visual"><div className="project-symbol">{index===0?'P':index===1?'D':'A'}<span>.</span></div><span className="project-number">{project.number} / 03</span><span className="visual-lines"/></div><div className="project-info"><span className="project-category">{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><div className="project-foot"><span>{project.stack}</span>{project.url&&<a href={project.url} target="_blank" rel="noreferrer" aria-label={`Ver ${project.title} en GitHub`}>↗</a>}</div></div></article>)}{loading&&<p className="loading">Cargando proyectos…</p>}</div></div></section>

      <section className="skills section" id="habilidades"><div className="wrap skills-grid"><div><p className="section-kicker">03 / MI CAJA DE HERRAMIENTAS</p><h2>Lo que uso<br/>para <em>construir.</em></h2><p>Elijo cada tecnología por lo que aporta al proyecto: rendimiento, claridad y facilidad de mantenimiento.</p></div><div className="skill-list">{profile.skills.map((skill,index)=><div className="skill-row" key={skill}><span className="skill-index">0{index+1}</span><strong>{skill}</strong><span className="skill-arrow">↗</span></div>)}</div></div></section>

      <section className="contact section" id="contacto"><div className="wrap contact-grid"><div className="contact-copy"><p className="section-kicker">04 / CONTACTO</p><h2>¿Hacemos algo<br/><em>increíble</em><br/>juntos?</h2><p>Si tienes una idea, una pregunta o quieres conversar sobre un proyecto, escríbeme. Me encantará leerte.</p><div className="contact-decoration">HABLEMOS <span>↗</span></div></div><form className="contact-form" onSubmit={sendMessage}><h3>Cuéntame tu idea<span>.</span></h3><label htmlFor="name">Tu nombre</label><input id="name" name="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="¿Cómo te llamas?" minLength={2} maxLength={100} required/><label htmlFor="email">Tu correo</label><input id="email" name="email" type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="correo@ejemplo.com" required/><label htmlFor="message">Tu mensaje</label><textarea id="message" name="message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Hola Erik, tengo una idea..." minLength={10} maxLength={2000} rows={5} required/><button className="button button-primary" type="submit" disabled={sending}>{sending?'Enviando…':'Enviar mensaje'} <span aria-hidden="true">↗</span></button><p className="form-feedback" role="status">{feedback}</p></form></div></section>
    </main>
    <footer><div className="wrap footer-inner"><a href="#inicio" className="footer-logo">ES<span>.</span></a><span>© {new Date().getFullYear()} {profile.name}</span><a href="#inicio">Volver arriba ↑</a></div></footer>
  </>;
}
