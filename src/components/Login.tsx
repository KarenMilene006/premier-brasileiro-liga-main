import React, { useState } from "react";
import { Link } from "react-router-dom";


export const Login = () => {
  const [isNewParticipant, setIsNewParticipant] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 font-sans bg-gradient-to-br from-[#3D195B] via-[#E90052] to-[#3D195B]">
      {/* Container geral */}
      <div className="flex w-full max-w-[1040px] rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.45)] bg-[#0b0614dd] border border-white/5">
        {/* Lado esquerdo */}
        <div
          className="relative flex-[1.1] bg-cover bg-center"
        //   style={{ backgroundImage: `url(${logoChannel})` }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_55%),linear-gradient(135deg,rgba(61,25,91,0.85),rgba(233,0,82,0.65))] mix-blend-multiply" />

          <div className="relative z-10 h-full p-8 flex flex-col justify-between text-white">
            <div>
              <p className="text-xs tracking-[0.16em] uppercase opacity-90">
                Futebol Inglês Brasil
              </p>
              <h1 className="mt-2 text-3xl font-extrabold leading-tight drop-shadow-[0_6px_18px_rgba(0,0,0,0.6)]">
                Bolão Premier League,
                <br />
                lives, palpites e resultados
              </h1>
            </div>

            <p className="mt-6 text-sm leading-relaxed max-w-xs opacity-95">
              Entre na comunidade para acompanhar as rodadas, deixar seu palpite
              no bolão e ver quem está liderando a tabela.
            </p>

            <div className="mt-6 text-xs opacity-90">
              <span className="opacity-75">Powered by</span>{" "}
              <strong>Futebol Inglês Brasil</strong>
            </div>
          </div>
        </div>

        {/* Lado direito */}
        <div className="flex-1 p-8 flex flex-col justify-between text-white bg-[radial-gradient(circle_at_top,rgba(233,0,82,0.14),transparent_55%),linear-gradient(160deg,#05020A_0%,#05020A_40%,#0b0614_100%)]">
          <div>
            <p className="text-xs tracking-[0.16em] uppercase text-white/60">
              área exclusiva
            </p>
            <h2 className="mt-1 text-2xl font-bold">
              {isNewParticipant
                ? "Criar participação no bolão"
                : "Entrar no bolão"}
            </h2>
            <p className="mt-1 text-sm text-white/70">
              {isNewParticipant
                ? "Defina seu nickname para aparecer nas lives e acompanhe a classificação."
                : "Use seu nickname e senha para entrar no sistema."}
            </p>

            {/* Toggle */}
            <div className="mt-6 mb-5 flex gap-2 p-1 rounded-full bg-white/5">
              <button
                type="button"
                onClick={() => setIsNewParticipant(false)}
                className={`flex-1 py-2 text-sm font-semibold rounded-full transition
                  ${
                    !isNewParticipant
                      ? "bg-[#E90052] text-white shadow-[0_10px_25px_rgba(233,0,82,0.5)]"
                      : "text-white/70"
                  }`}
              >
                Já sou participante
              </button>
              <button
                type="button"
                onClick={() => setIsNewParticipant(true)}
                className={`flex-1 py-2 text-sm font-semibold rounded-full transition
                  ${
                    isNewParticipant
                      ? "bg-[#E90052] text-white shadow-[0_10px_25px_rgba(233,0,82,0.5)]"
                      : "text-white/70"
                  }`}
              >
                Quero participar
              </button>
            </div>

            {/* Form */}
            <form onSubmit={(e) => e.preventDefault()}>
              {/* Nick */}
              <div className="mb-4">
                <label className="block text-sm mb-1 text-white/85">
                  Nickname
                </label>
                <input
                  type="text"
                  required
                  placeholder="@seu-nick"
                  className="w-full px-3 py-2 rounded-xl bg-[#090414e6] border border-white/10 text-white text-sm outline-none focus:border-[#E90052] focus:ring-1 focus:ring-[#E90052]"
                />
              </div>

              {/* Email */}
              {isNewParticipant && (
                <div className="mb-4">
                  <label className="block text-sm mb-1 text-white/85">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="seuemail@exemplo.com"
                    className="w-full px-3 py-2 rounded-xl bg-[#090414e6] border border-white/10 text-white text-sm outline-none focus:border-[#E90052] focus:ring-1 focus:ring-[#E90052]"
                  />
                </div>
              )}

              {/* Senha */}
              <div>
                <label className="block text-sm mb-1 text-white/85">
                  Senha
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-3 py-2 rounded-xl bg-[#090414e6] border border-white/10 text-white text-sm outline-none focus:border-[#E90052] focus:ring-1 focus:ring-[#E90052]"
                />
              </div>

              {!isNewParticipant && (
                <div className="text-right mt-2 mb-4">
                  <button
                    type="button"
                    className="text-xs text-[#E90052] hover:underline"
                  >
                    Esqueceu a senha?
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="mt-3 w-full py-3 rounded-full font-bold text-sm tracking-widest uppercase text-white
                  bg-gradient-to-br from-[#E90052] via-[#FF4F9A] to-[#E90052]
                  shadow-[0_16px_35px_rgba(233,0,82,0.55)]
                  transition active:scale-[0.99] hover:brightness-105"
              >
                {isNewParticipant
                  ? "Criar conta no bolão"
                  : "Entrar no sistema"}
              </button>
            </form>
          </div>

          {/* Rodapé */}
          <div className="mt-5 flex justify-between items-center text-xs text-white/70">
            <span>Pronto para acompanhar a rodada?</span>
            <Link
              to="/index"
              className="text-[#E90052] font-semibold hover:underline"
            >
              Ir para o sistema
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
