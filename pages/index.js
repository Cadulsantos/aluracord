import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import React from "react";
import appConfig from "../config.json";
import { useRouter } from 'next/router';



function Titulo(props) {
  const Tag = props.tag || "h1";
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>
        {`
          ${Tag} {
            color: ${appConfig.theme.colors.neutrals["100"]};
            font-size: 24px;
            font-weight: 600;
          }
        `}
      </style>
    </>
  );
}

//Componente React
// function HomePage() {
//     return (
//         <div>
//             <GlobalStyles />
//            <Titulo tag="h2">Boas vindas de volta!</Titulo>
//            <h2>Discord - Alura Matrix</h2>
//         </div>
//     )
// }

//   export default HomePage

export default function PaginaInicial() {
  const [github, setGithub] = React.useState('');
  const [username, setUsername] = React.useState('');
  const roteamento = useRouter();
  const image = 'https://img.freepik.com/vetores-gratis/astronauta-bonito-trabalhando-na-ilustracao-de-icone-de-vetor-de-desenho-animado-laptop-conceito-de-icone-de-tecnologia-de-ciencia-vetor-premium-isolado-estilo-flat-cartoon_138676-3332.jpg?size=338&ext=jpg';
  var [status, setStatus] = React.useState(false);

  React.useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        setGithub(result);
        console.log(result);
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, [username]);

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[900],
          backgroundImage:
            `url(${appConfig.backGroundImg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            padding: "32px",
            margin: "16px",
            backgroundColor: "rgba(0, 0, 0, 0.63)",
            border: "1px solid rgba(0, 0, 0, 0.88)",
            borderColor: appConfig.theme.colors.neutrals[999],
            borderRadius: "16px",
            flex: 1,
            minHeight: "240px",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(2.6px)",
            webkitBackdropFilter: "blur(2.6px)",
          }}
        >

          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function (infosDoEvento) {

              if (!status)
                return;

              infosDoEvento.preventDefault();
              roteamento.push(`/chat/?username=${username}`);
              // window.location.href = '/chat';
            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Titulo tag="h2">Boas vindas de volta!</Titulo>


            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            <TextField
              value={username}
              placeholder="Informe o seu usuário do Github"
              onChange={function handler(event) {
                // console.log("usuario digitou" + event.target.value)
                //Onde ta o valor?
                const valor = event.target.value;
                //Trocar o valor da variável
                //através do React e avise quem precisa
                setUsername(valor);

                //Validação de quantidade de caracteres
                if (valor.length > 1)
                  setStatus(true);
                else
                  setStatus(false);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[500],
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                },
              }}
            />
            <Button
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[500],
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}

          <Box
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: "rgba(0, 0, 0, 0.23)",
              border: "1px solid rgba(0, 0, 0, 0.88)",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "16px",
              flex: 1,
              minHeight: "240px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(4.7px)",
              webkitBackdropFilter: "blur(4.7px)",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={status === true
                ? `https://github.com/${username}.png`
                : image
              }
            />

            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}>
              {/* { status ? github.name : "" } */}
              {status ? username : ""}
            </Text>

            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals["200"],
                padding: "3px 10px",
                borderRadius: "1000px",
                marginTop: "8px",
              }}
            >
              {status ? `Followers: ${github.followers}` : ""}
            </Text>
          </Box>

          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
