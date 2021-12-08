import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import logo from '../../assets/imgs/logo.jpg';
import MenuAdmin from '../painelAdmin/components/menu';
import MenuArmazem from '../painelArmazem/components/menu';
import MenuClassicador from '../painelClassificador/components/menu';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Cookies from 'js-cookie';
import api from '../../services/api';
import { useHistory } from "react-router-dom";
import moment from 'moment';
import InputMask from "react-input-mask";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));



export default function CadastroClassificador() {
  const classes = useStyles();
  const history = useHistory();
  const [regra, setRegra] = useState('');

  /* variaveis de estado de cadastro de endereco*/
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [cpf, setCpf] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [rg, setRg] = useState('');
  const [ctps, setCtps] = useState('');
  const [tituloEleitor, setTituloEleitor] = useState('');
  const [cnh, setCnh] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');



  const [erroNome, setErroNome] = useState(false);
  const [textoErroNome, setTextoErroNome] = useState('');

  const [erroSobrenome, setErroSobrenome] = useState(false);
  const [textoErroSobrenome, setTextoErroSobrenome] = useState('');


  const [erroCpf, setErroCpf] = useState(false);
  const [textoErroCpf, setTextoErroCpf] = useState('');

  const [erroNascimento, setErroNascimento] = useState(false);
  const [textoErroNascimento, setTextoErroNascimento] = useState('');

  const [erroUsername, setErroUsername] = useState(false);
  const [textoErroUsername, setTextoErroUsername] = useState('');

  const [erroEmail, setErroEmail] = useState(false);
  const [textoErroEmail, setTextoErroEmail] = useState('');

  const [erroPassword, setErroPassword] = useState(false);
  const [textoErroPassword, setTextoErroPassword] = useState('');


  function validateNome() {
    if (nome?.length > 2) {
      setErroNome(false);
      setTextoErroNome('');
      return true;
    } else {
      setErroNome(true);
      setTextoErroNome("Nome muito curto");
      return false;
    }
  }

  function validadeNascimento() {
    if (nascimento?.length === 10) {
      setErroNascimento(false);
      setTextoErroNascimento('');
      return true;
    } else {
      setErroNascimento(true);
      setTextoErroNascimento("Data de Nascimento Inválida!");
      return false;
    }
  }

  const maskDate = value => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{2})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1");
  };

  function validateSobrenome() {
    if (sobrenome?.length > 2) {
      setErroSobrenome(false);
      setTextoErroSobrenome('');
      return true;
    } else {
      setErroSobrenome(true);
      setTextoErroSobrenome("Sobrenome muito curto");
      return false;
    }
  }


  function validateUsername() {
    if (username?.length > 8) {
      setErroUsername(false);
      setTextoErroUsername('');
      return true;
    } else {
      setErroUsername(true);
      setTextoErroUsername("Usuário Inválido");
      return false;
    }
  }

  async function procurarCpf() {
    console.log("procurar cpf chamado: " + cpf);


    const response = await api.get('/v1/admin/auth/buscarcpf/' + cpf);

    const cliente_salvo = response.data;

    console.log(" " + cliente_salvo);
    return JSON.stringify(cliente_salvo);
  }


  async function procurarUsername() {
    console.log("procurar username chamado: " + username);


    const response = await api.get('/v1/admin/auth/buscarusername/' + username);

    const cliente_salvo = response.data;

    console.log(" " + cliente_salvo);
    return JSON.stringify(cliente_salvo);
  }

  async function procurarEmail() {
    console.log("procurar email chamado: " + email);


    const response = await api.get('/v1/admin/auth/buscaremail/' + email);

    const cliente_salvo = response.data;

    console.log(" " + cliente_salvo);
    return JSON.stringify(cliente_salvo);
  }


  function validateCpf() {

    if (cpf.length === 11) {

      setErroCpf(false);
      setTextoErroCpf('');
      return true;
    } else {

      setErroCpf(true);
      setTextoErroCpf("CPF Inválido!");

      return false;
    }
  }


  function validateSenha() {
    if (password.length >= 8) {
      if (password === password2) {

        setErroPassword(false);
        setTextoErroPassword('');
        return true;
      } else {

        setErroPassword(true);
        setTextoErroPassword("Senhas não conferem");
        console.log("senhas nao conferem");
        return false;
      }
    } else {
      setErroPassword(true);
      setTextoErroPassword("Senha em branco");
      console.log("Senha em branco");
      return false;
    }
  }

  function validateEmail() {
    //var re1 = /\S+@\S+\.\S+/;
    var re = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    var re2 = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+\.[A-Za-z]+$/;
    if (re.test(email) || re2.test(email)) {

      setErroEmail(false);
      setTextoErroEmail('');
      return true;
    } else {

      setErroEmail(true);
      setTextoErroEmail("Email Inválido!");

      return false;
    }
  }


  async function salvar() {
    validateNome();
    validateSobrenome();
    validateCpf();
    validateSenha();
    validateEmail();
    validateUsername();
    validadeNascimento();

    if (validateNome() && validateSobrenome() && validateCpf() && validateSenha() && validateEmail() && validateUsername() && validadeNascimento()) {
      console.log("cadastro aceito");


      var cpf_ja_cadastrado = parseInt((await procurarCpf()).toString());

      if (cpf_ja_cadastrado === 1) {
        setErroCpf(true);
        setTextoErroCpf("CPF Já Cadastrado!");

      } else {
        setErroCpf(false);
        setTextoErroCpf("");

        var email_ja_cadastrado = parseInt((await procurarEmail()).toString());
        if (email_ja_cadastrado === 1) {
          setErroEmail(true);
          setTextoErroEmail("E-Mail Já Cadastrado!");
        } else {
          setErroEmail(false);
          setTextoErroEmail("");


          var username_ja_cadastrado = parseInt((await procurarUsername()).toString());

          if (username_ja_cadastrado === 1) {
            setErroUsername(true);
            setTextoErroUsername("Usuário Já Cadastrado!");
          } else {
            setErroUsername(false);
            setTextoErroUsername("");


            try {
              const data_do_cadastro = moment(new Date()).format("YYYY-MM-DD HH:MM");

              console.log("cadastrar chamado");
              const cadastro_classificador = {
                tipo: '2',
                nome: nome,
                sobrenome: sobrenome,
                cpf: cpf,
                nascimento: nascimento,
                rg: rg,
                ctps: ctps,
                titulo_eleitor: tituloEleitor,
                cnh: cnh,
                username: username,
                data_cadastro: data_do_cadastro,
                email: email,
                regra: ["classificador"],
                password: password,
              }

              const headers = {
                'Authorization': 'Bearer ' + Cookies.get("token")
              }

              const response = await api.post('/v1/admin/auth/cadastrarclassificador', cadastro_classificador,
                { headers: headers });

              const cadastro_salvo = response.data;
              if (cadastro_salvo) {
                history.push({
                  pathname: '/classificadores',
                })
              } else {
                alert("Erro de Conexão, tente novamente mais tarde");
              }
            } catch (_err) {
              console.log("erro ao cadastrar: " + _err);
              alert("Erro de Conexão, tente novamente mais tarde");

            }

          }


        }
      }



    } else {
      console.log("cadastro nao aceito")
    }


  }

  async function procurarRegra() {
    try {
      const regra = Cookies.get('regra');
      setRegra(regra);

    } catch (_err) {

    }
  }

  useEffect(() => {

    procurarRegra();

  }, []);


  const renderMenu = () => {
    console.log("regra na funcao render: " + regra);

    if (regra === "ROLE_ADMIN") {
      return <MenuAdmin />
    } else if (regra === "ROLE_ARMAZEM") {
      return <MenuArmazem />
    } else if (regra === "ROLE_CLASSIFICADOR") {
      return <MenuClassicador />
    }
  }


  return (
    <div>
      <div style={{ backgroundColor: 'black', width: '100%', height: 60 }}>
        <a href="/">   <img src={logo} styles={{ height: 20 }} alt="logotipo" /></a>
      </div>
      <div className={classes.root} >
        {
          renderMenu()
        }
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container} >
            <React.Fragment >
              <Grid container spacing={2} >


                <Grid item xs={3} >
                  <TextField
                    error={erroNome}
                    helperText={textoErroNome}
                    variant="standard"
                    name="nome"
                    label="Nome"
                    required
                    id="nome"
                    autoComplete="nome"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    inputProps={{ maxLength: 50, minLength: 2 }}
                    fullWidth

                  />
                </Grid>

                <Grid item xs={3}  >
                  <TextField
                    error={erroSobrenome}
                    helperText={textoErroSobrenome}
                    variant="standard"
                    name="sobrenome"
                    label="Sobrenome"
                    required
                    id="sobrenome"
                    value={sobrenome}
                    onChange={e => setSobrenome(e.target.value)}
                    inputProps={{ maxLength: 50, minLength: 2 }}
                    fullWidth

                  />
                </Grid>

                <Grid
                  container
                  direction="row"
                  item xs={12}
                  spacing={2}>
                  <Grid item xs={3}  >
                    <TextField
                      error={erroCpf}
                      helperText={textoErroCpf}
                      variant="standard"
                      name="cpf"
                      label="CPF"
                      required
                      id="cpf"
                      value={cpf}
                      onChange={e => setCpf(e.target.value)}
                      inputProps={{ maxLength: 11, minLength: 11 }}
                      fullWidth

                    />
                  </Grid>

                  <Grid item xs={3} >

                    <TextField
                      error={erroNascimento}
                      helperText={textoErroNascimento}
                      variant="standard"
                      name="nascimento"
                      label="Data de Nascimento"
                      required
                      id="nascimento"
                      value={nascimento}
                      onChange={e => setNascimento(maskDate(e.target.value))}
                      inputProps={{ maxLength: 11, minLength: 11 }}
                      fullWidth

                    />


                  </Grid>
                </Grid>


                <Grid item xs={3} >
                  <TextField
                    variant="standard"
                    name="rg"
                    label="RG(Identidade)"
                    id="rg"
                    autoComplete="rg"
                    value={rg}
                    onChange={e => setRg(e.target.value)}
                    inputProps={{ maxLength: 50, minLength: 0 }}
                    fullWidth

                  />
                </Grid>

                <Grid item xs={3}  >
                  <TextField
                    variant="standard"
                    name="ctps"
                    label="CTPS"
                    id="ctps"
                    value={ctps}
                    onChange={e => setCtps(e.target.value)}
                    inputProps={{ maxLength: 50, minLength: 0 }}
                    fullWidth

                  />
                </Grid>


                <Grid item xs={3}  >
                  <TextField
                    variant="standard"
                    name="tituloeleitor"
                    label="Título de Eleitor"
                    id="tituloeleitor"
                    value={tituloEleitor}
                    onChange={e => setTituloEleitor(e.target.value)}
                    inputProps={{ maxLength: 50, minLength: 0 }}
                    fullWidth

                  />
                </Grid>

                <Grid item xs={3}  >
                  <TextField
                    variant="standard"
                    name="cnh"
                    label="CNH"
                    id="cnh"
                    value={cnh}
                    onChange={e => setCnh(e.target.value)}
                    inputProps={{ maxLength: 20, minLength: 0 }}
                    fullWidth

                  />
                </Grid>



                <Grid item xs={3} >
                  <TextField
                    error={erroUsername}
                    id="username"
                    helperText={textoErroUsername}
                    variant="standard"
                    name="username"
                    fullWidth
                    label="Usuário"
                    required
                    autoComplete="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    inputProps={{ maxLength: 20, minLength: 8 }}

                  />
                </Grid>

                <Grid item xs={5}  >
                  <TextField
                    error={erroEmail}
                    id="email"
                    helperText={textoErroEmail}
                    variant="standard"
                    name="email"
                    fullWidth
                    label="E-Mail"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    inputProps={{ maxLength: 50, minLength: 15 }}

                  />
                </Grid>

                <Grid
                  container
                  direction="row"
                  item xs={12}
                  spacing={2}>
                  <Grid item xs={3}>
                    <TextField
                      error={erroPassword}
                      id="password"
                      helperText={textoErroPassword}
                      variant="standard"
                      name="password"
                      fullWidth
                      label="Senha"
                      required
                      type="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      inputProps={{ maxLength: 40, minLength: 6 }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      error={erroPassword}
                      id="password2"
                      helperText={textoErroPassword}
                      variant="standard"
                      name="password2"
                      fullWidth
                      label="Conferir Senha"
                      required
                      type="password"
                      autoComplete="current-password"
                      value={password2}
                      onChange={e => setPassword2(e.target.value)}
                      inputProps={{ maxLength: 40, minLength: 6 }}
                    />
                  </Grid>
                </Grid>

                <Grid
                  container
                  direction="row"
                  justifyContent="flex-end"
                  alignItems="center"
                  item xs={10}
                >
                  <Button style={{ marginTop: 50 }}
                    variant="contained"
                    color="primary"
                    onClick={salvar}
                  > Salvar  </Button>
                </Grid>

              </Grid>


            </React.Fragment>


          </Container>
        </main>
      </div>
    </div>
  );
}


