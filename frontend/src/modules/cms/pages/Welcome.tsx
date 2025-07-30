export default function Welcome() {
  const colorPalette = [
    { name: 'Fondo general', class: 'bg-zinc-950', hex: 'zinc-950' },
    { name: 'Cards / elementos', class: 'bg-zinc-900', hex: 'zinc-900' },
    { name: 'Texto principal', class: 'bg-white', hex: 'white' },
    { name: 'Texto secundario', class: 'bg-zinc-400', hex: 'zinc-400' },
    { name: 'Bordes / separadores', class: 'bg-zinc-700', hex: 'zinc-700' },
    { name: 'Botones primarios', class: 'bg-white', hex: 'white' },
    { name: 'Botones hover', class: 'bg-gray-100', hex: 'gray-100' },
    { name: 'Accento azul', class: 'bg-blue-500', hex: 'blue-500' },
    { name: 'Éxito', class: 'bg-emerald-500', hex: 'emerald-500' },
    { name: 'Error', class: 'bg-red-500', hex: 'red-500' },
    { name: 'Advertencia', class: 'bg-amber-500', hex: 'amber-500' },
  ];

  const fonts = [
    { name: 'Inter', class: 'font-sans', usage: 'Texto general' },
    { name: 'Poppins', class: '', usage: 'Títulos y encabezados' },
    { name: 'Sora', class: 'font-mono', usage: 'Código y monospace' },
  ];

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-text-primary mb-4" style={{fontFamily: 'Poppins, system-ui, sans-serif'}}>
            Medialab CRM
          </h1>
          <p className="text-xl text-text-secondary font-sans">
            Sistema de gestión para el departamento de medios audiovisuales
          </p>
          <div className="mt-6 flex gap-4 justify-center">
            <div className="bg-surface px-4 py-2 rounded-lg border border-border">
              <span className="text-sm text-text-secondary">Universidad Galileo</span>
            </div>
            <a 
              href="/showcase" 
              className="bg-white hover:bg-gray-100 text-zinc-900 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
              style={{ fontFamily: 'Poppins, system-ui, sans-serif' }}
            >
              Ver Componentes UI
            </a>
          </div>
        </div>

        {/* Paleta de colores */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-text-primary mb-8" style={{fontFamily: 'Poppins, system-ui, sans-serif'}}>
            Paleta de Colores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {colorPalette.map((color) => (
              <div key={color.name} className="bg-surface border border-border rounded-lg p-4">
                <div className={`w-full h-16 rounded-md mb-3 ${color.class}`}></div>
                <h3 className="font-medium text-text-primary mb-1" style={{fontFamily: 'Poppins, system-ui, sans-serif'}}>
                  {color.name}
                </h3>
                <p className="text-sm text-text-secondary font-mono">{color.hex}</p>
                <p className="text-xs text-text-secondary mt-1">{color.class}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tipografías */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-text-primary mb-8" style={{fontFamily: 'Poppins, system-ui, sans-serif'}}>
            Tipografías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {fonts.map((font) => (
              <div key={font.name} className="bg-surface border border-border rounded-lg p-6">
                <h3 
                  className={`text-2xl ${font.class} font-semibold text-text-primary mb-2`}
                  style={font.name === 'Poppins' ? {fontFamily: 'Poppins, system-ui, sans-serif'} : {}}
                >
                  {font.name}
                </h3>
                <p className="text-text-secondary mb-4">{font.usage}</p>
                <div 
                  className={`${font.class} text-text-primary`}
                  style={font.name === 'Poppins' ? {fontFamily: 'Poppins, system-ui, sans-serif'} : {}}
                >
                  <p className="text-lg mb-2">Aa Bb Cc Dd Ee Ff</p>
                  <p className="text-sm text-text-secondary">
                    The quick brown fox jumps over the lazy dog
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Estados del sistema */}
        <div className="mb-12">
          <h2 className="text-3xl font-semibold text-text-primary mb-8" style={{fontFamily: 'Poppins, system-ui, sans-serif'}}>
            Estados del Sistema
          </h2>
          <div className="bg-surface border border-border rounded-lg p-6">
            <div className="flex flex-wrap gap-4">
              <span className="status-published">Publicado</span>
              <span className="status-draft">Borrador</span>
              <span className="status-archived">Archivado</span>
            </div>
          </div>
        </div>

        {/* Preview de componentes */}
        <div>
          <h2 className="text-3xl font-semibold text-text-primary mb-8" style={{fontFamily: 'Poppins, system-ui, sans-serif'}}>
            Componentes Base
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card">
              <h3 className="font-semibold text-text-primary mb-4" style={{fontFamily: 'Poppins, system-ui, sans-serif'}}>Botones</h3>
              <div className="space-y-3">
                <button className="btn-primary w-full">Botón Primario</button>
                <button className="btn-secondary w-full">Botón Secundario</button>
              </div>
            </div>

            <div className="card">
              <h3 className="font-semibold text-text-primary mb-4" style={{fontFamily: 'Poppins, system-ui, sans-serif'}}>Formularios</h3>
              <div className="space-y-3">
                <div>
                  <label className="label-base">Nombre del evento</label>
                  <input 
                    className="input-base w-full" 
                    placeholder="Ingresa el nombre del evento"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center border-t border-border pt-8">
          <p className="text-text-secondary text-sm">
            Sistema en desarrollo - Medialab Universidad Galileo
          </p>
        </div>
      </div>
    </div>
  );
}