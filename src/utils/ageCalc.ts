export function ageCalculation(birthday): number {
  const hoje = new Date();

  let idade = hoje.getFullYear() - birthday.getFullYear();

  const mesAtual = hoje.getMonth();
  const diaAtual = hoje.getDate();

  const mesNascimento = birthday.getMonth();
  const diaNascimento = birthday.getDate();

  // Se ainda não fez aniversário neste ano, subtrai 1
  if (
    mesAtual < mesNascimento ||
    (mesAtual === mesNascimento && diaAtual < diaNascimento)
  ) {
    idade--;
  }

  return idade;
}