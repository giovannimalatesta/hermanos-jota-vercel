import React, { useState } from "react";

const INITIAL = { nombre: "", email: "", telefono: "", asunto: "", mensaje: "" };

export default function ContactForm() {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | ok | fail
  const [progress, setProgress] = useState(0);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((e) => ({ ...e, [name]: "" }));
    }

    // Update progress
    const filled = Object.values({ ...values, [name]: value }).filter(v => v.trim()).length;
    setProgress((filled / 5) * 100);
  };

  const onBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    validateField(name, values[name]);
  };

  const validateField = (name, value) => {
    let error = "";
    
    switch(name) {
      case "nombre":
        if (!value.trim()) error = "El nombre es obligatorio";
        else if (value.trim().length < 2) error = "Mínimo 2 caracteres";
        else if (value.trim().length > 60) error = "Máximo 60 caracteres";
        break;
      
      case "email":
        if (!value.trim()) error = "El email es obligatorio";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) 
          error = "Email inválido";
        break;
      
      case "telefono":
        if (value && !/^[\d\s+()-]{8,20}$/.test(value))
          error = "Teléfono inválido";
        break;
      
      case "asunto":
        if (!value.trim()) error = "El asunto es obligatorio";
        else if (value.trim().length < 3) error = "Mínimo 3 caracteres";
        break;
      
      case "mensaje":
        if (!value.trim()) error = "El mensaje es obligatorio";
        else if (value.trim().length < 10) error = "Mínimo 10 caracteres";
        else if (value.trim().length > 1000) error = "Máximo 1000 caracteres";
        break;
    }
    
    if (error) {
      setErrors((e) => ({ ...e, [name]: error }));
    }
    return !error;
  };

  const validate = () => {
    const e = {};
    Object.keys(values).forEach(key => {
      if (key !== 'telefono') { // telefono es opcional
        if (!validateField(key, values[key])) {
          e[key] = errors[key];
        }
      }
    });
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev) => {
    ev.preventDefault();
    
    // Mark all as touched
    setTouched({ nombre: true, email: true, asunto: true, mensaje: true });
    
    if (!validate()) return;

    try {
      setStatus("sending");
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      
      if (!res.ok) throw new Error();
      
      setStatus("ok");
      setValues(INITIAL);
      setTouched({});
      setErrors({});
      setProgress(0);
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("fail");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const getFieldStatus = (name) => {
    if (touched[name]) {
      return errors[name] ? 'error' : values[name] ? 'success' : '';
    }
    return '';
  };

  return (
    <div className="modern-contact-form">
      <div className="form-header">
        <div className="form-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
        </div>
        <h3>Envianos un mensaje</h3>
        <p className="form-description">
          Completá el formulario y nos pondremos en contacto a la brevedad
        </p>
      </div>

      {/* Progress bar */}
      <div className="form-progress" role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <form onSubmit={onSubmit} noValidate>
        <div className="form-grid">
        {/* Nombre */}
          <div className={`form-field ${getFieldStatus('nombre')}`}>
            <div className="field-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={values.nombre}
            onChange={onChange}
              onBlur={onBlur}
              placeholder=" "
              className="field-input"
            aria-invalid={!!errors.nombre}
              aria-describedby={errors.nombre ? "nombre-error" : undefined}
            />
            <label htmlFor="nombre" className="field-label">
              Nombre completo <span className="required">*</span>
            </label>
            {touched.nombre && errors.nombre && (
              <span id="nombre-error" className="field-error" role="alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                {errors.nombre}
              </span>
            )}
            {touched.nombre && !errors.nombre && values.nombre && (
              <span className="field-success">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </span>
            )}
        </div>

        {/* Email */}
          <div className={`form-field ${getFieldStatus('email')}`}>
            <div className="field-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </div>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={onChange}
              onBlur={onBlur}
              placeholder=" "
              className="field-input"
            aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            <label htmlFor="email" className="field-label">
              Email <span className="required">*</span>
            </label>
            {touched.email && errors.email && (
              <span id="email-error" className="field-error" role="alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                {errors.email}
              </span>
            )}
            {touched.email && !errors.email && values.email && (
              <span className="field-success">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </span>
            )}
          </div>

          {/* Teléfono */}
          <div className={`form-field ${getFieldStatus('telefono')}`}>
            <div className="field-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <input
              id="telefono"
              name="telefono"
              type="tel"
              value={values.telefono}
              onChange={onChange}
              onBlur={onBlur}
              placeholder=" "
              className="field-input"
              aria-invalid={!!errors.telefono}
              aria-describedby={errors.telefono ? "telefono-error" : "telefono-help"}
            />
            <label htmlFor="telefono" className="field-label">
              Teléfono <span className="optional">(opcional)</span>
            </label>
            {touched.telefono && errors.telefono ? (
              <span id="telefono-error" className="field-error" role="alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                {errors.telefono}
              </span>
            ) : (
              <span id="telefono-help" className="field-help">
                Ej: +54 11 1234-5678
              </span>
            )}
          </div>

          {/* Asunto */}
          <div className={`form-field ${getFieldStatus('asunto')}`}>
            <div className="field-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14,2 14,8 20,8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10,9 9,9 8,9"></polyline>
              </svg>
            </div>
            <input
              id="asunto"
              name="asunto"
              type="text"
              value={values.asunto}
              onChange={onChange}
              onBlur={onBlur}
              placeholder=" "
              className="field-input"
              aria-invalid={!!errors.asunto}
              aria-describedby={errors.asunto ? "asunto-error" : undefined}
            />
            <label htmlFor="asunto" className="field-label">
              Asunto <span className="required">*</span>
            </label>
            {touched.asunto && errors.asunto && (
              <span id="asunto-error" className="field-error" role="alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                {errors.asunto}
              </span>
            )}
            {touched.asunto && !errors.asunto && values.asunto && (
              <span className="field-success">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
              </span>
            )}
          </div>
        </div>

        {/* Mensaje - Full width */}
        <div className={`form-field full-width ${getFieldStatus('mensaje')}`}>
          <div className="field-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <textarea
            id="mensaje"
            name="mensaje"
            rows={6}
            value={values.mensaje}
            onChange={onChange}
            onBlur={onBlur}
            placeholder=" "
            className="field-input"
            aria-invalid={!!errors.mensaje}
            aria-describedby={errors.mensaje ? "mensaje-error" : "mensaje-help"}
          />
          <label htmlFor="mensaje" className="field-label">
            Mensaje <span className="required">*</span>
          </label>
          <div className="char-count">
            {values.mensaje.length}/1000
          </div>
          {touched.mensaje && errors.mensaje ? (
            <span id="mensaje-error" className="field-error" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              {errors.mensaje}
            </span>
          ) : (
            <span id="mensaje-help" className="field-help">
              Contanos en qué podemos ayudarte (mínimo 10 caracteres)
            </span>
          )}
          {touched.mensaje && !errors.mensaje && values.mensaje && (
            <span className="field-success">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
              </svg>
            </span>
          )}
        </div>

        {/* Submit button */}
        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button" 
            disabled={status === "sending"}
          >
            {status === "sending" ? (
              <>
                <span className="spinner"></span>
                Enviando...
              </>
            ) : (
              <>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
                Enviar mensaje
              </>
            )}
        </button>
        </div>

        {/* Status messages */}
        {status === "ok" && (
          <div className="status-message success" role="alert">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            <div>
              <strong>¡Mensaje enviado con éxito!</strong>
              <p>Te responderemos a la brevedad.</p>
            </div>
          </div>
        )}

        {status === "fail" && (
          <div className="status-message error" role="alert">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/>
            </svg>
            <div>
              <strong>Error al enviar</strong>
              <p>Por favor, intentá nuevamente.</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
