import { useState } from 'react';
import { Copy, Download, Check, FileCode2, Sparkles } from 'lucide-react';

export function App() {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [techs, setTechs] = useState('');
  const [features, setFeatures] = useState('');
  const runSteps = 'npm install\nnpm run dev';
  const [copied, setCopied] = useState(false);

  const markdownOutput = `# ${title || 'Nome do Projeto'}

> ${desc || 'Uma breve síntese do objetivo e utilidade desta aplicação.'}

## 🎯 Problema Enfrentado
${problem || 'Descreva a dor ou gargalo real que motivou a criação deste software.'}

## 💡 Decisão Técnica & Solução
${solution || 'Explique os critérios de arquitetura, padrões de projeto e tecnologias adotadas.'}

## 🛠️ Tecnologias
${techs ? techs.split(',').map((t) => `- **${t.trim()}**`).join('\n') : '- React\n- TypeScript\n- Vite'}

## ✨ Principais Funcionalidades
${features ? features.split('\n').filter((f) => f.trim() !== '').map((f) => `- ${f.trim()}`).join('\n') : '- Interface responsiva\n- Execução 100% client-side'}

## 🚀 Como Rodar Localmente

\`\`\`bash
# Clone este repositório
git clone https://github.com/seu-usuario/${title.toLowerCase().replace(/\s+/g, '-') || 'repo'}.git

# Instale os pacotes e inicie o ambiente
${runSteps}
\`\`\`

---
Criado com foco em utilidade real e código aberto.
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(markdownOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    const blob = new Blob([markdownOutput], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'README.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '2.5rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Topo / Header da Ferramenta */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Sparkles size={16} /> DEV UTILITY SUITE
          </span>
          <h1 style={{ fontSize: '2rem', marginTop: '0.2rem' }}>DevLog & README Architect</h1>
          <p style={{ color: 'var(--text-sub)', fontSize: '0.95rem' }}>
            Documente arquiteturas de software e gere documentações profissionais para repositórios técnicos.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={copyToClipboard}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: copied ? '#10b981' : 'rgba(255,255,255,0.06)',
              color: '#fff',
              border: '1px solid var(--border)',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copiado!' : 'Copiar Markdown'}
          </button>

          <button
            onClick={downloadFile}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              backgroundColor: 'var(--primary)',
              color: '#090d16',
              border: 'none',
              padding: '0.6rem 1.2rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 700
            }}
          >
            <Download size={16} /> Baixar README.md
          </button>
        </div>
      </div>

      {/* Grid Principal */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
        {/* Painel de Entrada */}
        <div style={{
          backgroundColor: 'var(--panel)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '1.8rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem'
        }}>
          <div>
            <label style={{ display: 'block', color: 'var(--text-sub)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Nome do Projeto</label>
            <input
              style={{ width: '100%' }}
              placeholder="ex: Plataforma Conecta Serviços"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--text-sub)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Descrição Curta</label>
            <input
              style={{ width: '100%' }}
              placeholder="ex: Sistema para agendamento de prestadores de serviço com rotas"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--text-sub)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Tecnologias (vírgula)</label>
            <input
              style={{ width: '100%' }}
              placeholder="React, TypeScript, SQLite, .NET"
              value={techs}
              onChange={(e) => setTechs(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--text-sub)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>O Problema</label>
            <textarea
              rows={3}
              style={{ width: '100%' }}
              placeholder="Qual dor ou gargalo real esse app resolve?"
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--text-sub)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>A Solução Técnica</label>
            <textarea
              rows={3}
              style={{ width: '100%' }}
              placeholder="Quais decisões de arquitetura e escolhas técnicas foram feitas?"
              value={solution}
              onChange={(e) => setSolution(e.target.value)}
            />
          </div>

          <div>
            <label style={{ display: 'block', color: 'var(--text-sub)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>Funcionalidades (1 por linha)</label>
            <textarea
              rows={3}
              style={{ width: '100%' }}
              placeholder="Autenticação JWT&#10;Cálculo de rota&#10;Filtro por categoria"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
            />
          </div>
        </div>

        {/* Painel de Visualização */}
        <div style={{
          backgroundColor: 'var(--panel)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '1.8rem',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
            <FileCode2 size={20} />
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Output Formatado (README.md)</span>
          </div>

          <pre style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
            border: '1px solid var(--border)',
            borderRadius: '10px',
            padding: '1.2rem',
            color: '#e2e8f0',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontFamily: 'Consolas, Monaco, monospace'
          }}>
            {markdownOutput}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default App;