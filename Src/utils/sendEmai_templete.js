export const sendEmail_templete=(link)=> `<!DOCTYPE html>
<html>
<head>
   <title>Email Template</title>
</head>
<body style="background-color: #f4f4f4; font-family: Arial, sans-serif; margin: 0; padding: 0;">
   <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff;">
       <!-- Header Section -->
       <tr>
           <td align="center" bgcolor="#4cb96b" style="padding: 20px; color: #ffffff; font-size: 24px; font-weight: bold;">
               Welcome to Our Newsletter
           </td>
       </tr>
       <!-- Main Content Section -->
       <tr>
           <td style="padding: 20px; text-align: center;">
               <h2 style="color: #333333;">Hello, Subscriber!</h2>
               <p style="color: #555555; font-size: 16px;">
                   We are excited to share the latest updates and insights with you. Check out our featured article below!
               </p>
               <a href="${link}" style="display: inline-block; padding: 10px 20px; background-color: #4cb96b; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 5px;">
                  click To Active
               </a>
           </td>
       </tr>
       <!-- Footer Section -->
       <tr>
           <td align="center" bgcolor="#333333" style="padding: 10px; color: #ffffff; font-size: 14px;">
               Follow us on:
               <a href="#" style="color: #4cb96b; text-decoration: none;">Twitter</a> |
               <a href="#" style="color: #4cb96b; text-decoration: none;">LinkedIn</a> |
               <a href="#" style="color: #4cb96b; text-decoration: none;">Facebook</a>
           </td>
       </tr>
   </table>
</body>
</html>`