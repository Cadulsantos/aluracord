import { Box, Text, TextField, Image, Button, Icon } from "@skynexui/components";
import { createClient } from "@supabase/supabase-js";
import React from "react";
import appConfig from "../config.json";

const SUPABASE_ANON_KEY  ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzQwMTkzNCwiZXhwIjoxOTU4OTc3OTM0fQ.wLBQOOJ6yOLMCyrlNhX6G7SEUrJgTU1b5yaFvZZuN5M";
const SUPABASE_URL = "https://vzgeisgpozhpmuibpbtf.supabase.co";
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);


export default function ChatPage() {
  //Usuário
  /*
        - Usuário digita no campo textaarea 
        - Aperta enter para enviar
        - Tem que adicionar o texto na listagem
    */

  //Dev
  /*
        - [x] Campo Criado
        - [x] Vamos usar  o onChange usa o useState (ter if para caso seja enter pra limpar a variável)
        - [x] Limpar mensagens  
    */

  // Sua lógica vai aqui
  const [mensagem, setMensagem] = React.useState("");
  const [listaMensagens, setListaMensagens] = React.useState([]);

  React.useEffect(()=>{
    supabaseClient
    .from('mensagens')
    .select('*')
    .order('id', {ascending: false})
    .then(({ data })=>{
      console.log('Dados :', data);
      setListaMensagens(data);
    });
  }, []);
  

  function handleNovaMensagem(novaMensagem) {
    const mensagem = {
      // id: listaMensagens.length + 1,
      de: "cadulsantos",
      texto: novaMensagem,
    };

    supabaseClient.from('mensagens')
    .insert([
      // Tem que ser um objeto com os MESMOS CAMPOS que você escreveu no supabase
      mensagem
    ])
    .then(({data})=>{
      setListaMensagens([
          data[0],
          ...listaMensagens 
        ]);
    });


    // setListaMensagens([mensagem, ...listaMensagens ]);
    setMensagem("");
  }



  // ./Sua lógica vai aqui

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(https://virtualbackgrounds.site/wp-content/uploads/2020/08/the-matrix-digital-rain.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList mensagens={listaMensagens} setMensagens={setListaMensagens} />

          {/* Lista de Mensagens: {listaMensagens.map((mensagemAtual)=>{
              return(
                <li key={mensagemAtual.id}>
                    {mensagemAtual.de}: {mensagemAtual.texto}
                </li>
              )

          })} */}

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={mensagem}
              onChange={(event) => {
                setMensagem(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key == "Enter") {
                  event.preventDefault();

                  handleNovaMensagem(mensagem);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
            onClick= {()=>{
              handleNovaMensagem(mensagem);
            }}
               iconName="FaTelegramPlane"
               size="sm"
               buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[500],
                mainColorLight: appConfig.theme.colors.primary[400],
                mainColorStrong: appConfig.theme.colors.primary[600],
              }}
              
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text variant="heading5">Chat</Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  // console.log(props);
  function handleRemoverMessagem(idMensagem){
    supabaseClient
    .from('mensagens')
    .delete()
    .match({id : idMensagem})
    .then((retorno)=>{
      if(retorno.status == 200)
      {
        var novasMensagens  = props.mensagens.filter(x => x.id !== idMensagem);
        props.setMensagens(novasMensagens);
      }
    });
  }

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
    }}
    >
      {props.mensagens.map((mensagem) => {
       return (
        <Text
        key={mensagem.id}
        tag="li"
        styleSheet={{
          borderRadius: "5px",
          padding: "6px",
          marginBottom: "12px",
          hover: {
            backgroundColor: appConfig.theme.colors.neutrals[700],
          },
        }}
      >
        <Box
          styleSheet={{
            marginBottom: "8px",
          }}
        >
          <Image
            styleSheet={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              display: "inline-block",
              marginRight: "8px",
            }}
            src={`https://github.com/${mensagem.de}.png`}
          />
          <Text tag="strong">{mensagem.de}</Text>
          <Text
            styleSheet={{
              fontSize: "10px",
              marginLeft: "8px",
              color: appConfig.theme.colors.neutrals[300],
            }}
            tag="span"
          >
            {new Date().toLocaleDateString()}
          </Text>
          <Icon
            name= "FaTrashAlt"
            // type='button'
           
            styleSheet={{
              color: appConfig.theme.colors.neutrals[200], 
              display: "inline-block",
              marginLeft: "95%",
              width: "15px",
              cursor: "pointer",
              hover: {
                color: 'red',
              },
            
            }} 
            onClick = {()=>{
              handleRemoverMessagem(mensagem.id)
              // console.log(mensagem.id);
            }}
          />
        </Box>
        {mensagem.texto}
      </Text>

       );
      })}
    </Box>
  );
}
