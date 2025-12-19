export const mailOptionFunc = function (mail, url) {
  const indexHtml = `
<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
  <h2 style="color: #4A90E2; text-align: center;">Réinitialisation de votre mot de passe</h2>
  <p>Bonjour,</p>
  <p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte. Cliquez sur le bouton ci-dessous pour choisir un nouveau mot de passe :</p>
  
  <div style="text-align: center; margin: 30px 0;">
    <a href="${url}" style="background-color: #4A90E2; color: white; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">Réinitialiser mon mot de passe</a>
  </div>
  
  <p style="font-size: 0.9em; color: #666;">Ce lien est valable pendant 1 heure. Si vous n'avez pas demandé ce changement, vous pouvez ignorer cet e-mail en toute sécurité.</p>
  <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
  <p style="font-size: 0.8em; color: #999; text-align: center;">&copy; 2025 Votre Application</p>
</div>
`;

  const mailOption = {
    from: "NAUTH <noreply@nauth.com",
    to: mail,
    subject: "Réinitialisation de votre mot de passe",
    html: indexHtml,
  };
  return mailOption;
};
