import React, { useEffect, useState } from 'react';

const IOSInstallBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const ua = window.navigator.userAgent || '';
    const isIphone = /iPhone/i.test(ua);
    const isSafari = /Safari/i.test(ua) && !/CriOS|FxiOS|EdgiOS|OPiOS/i.test(ua);
    const isStandalone = (window.navigator as Navigator & { standalone?: boolean }).standalone === true;

    if (isIphone && isSafari && !isStandalone) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const id = window.setTimeout(() => setAnimateIn(true), 30);
    return () => window.clearTimeout(id);
  }, [visible]);

  const handleClose = () => {
    setVisible(false);
    setAnimateIn(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 shadow-lg border-t border-slate-200/70 dark:border-slate-700/60 transition-transform duration-300 ease-out ${
        animateIn ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center">
        <p className="text-sm leading-snug">
          Instale este app no seu iPhone: toque em Compartilhar e depois em &quot;Adicionar à Tela de Início&quot;.
        </p>
        <button
          type="button"
          onClick={handleClose}
          className="self-end sm:ml-auto sm:self-auto text-xs uppercase tracking-wide text-slate-500 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          aria-label="Fechar aviso de instalação"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default IOSInstallBanner;
