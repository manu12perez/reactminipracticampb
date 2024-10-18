import React, { Component } from "react";
import axios from "axios";

export default class EquiposJugadores extends Component {
  selectEquipo = React.createRef();
  cajaJugador = React.createRef();

  urlApi = "https://apiejemplos.azurewebsites.net/";

  state = {
    equipos: [],
    jugadores: [],
  };

  buscarNombre = (e) => {
    e.preventDefault();
    let nombre = this.cajaJugador.current.value.toLowerCase();
    let request = "api/Jugadores/FindJugadores/" + nombre;
    let url = this.urlApi + request;
    axios.get(url).then((response) => {
      console.log(response.data);
      this.setState({
        jugadores: response.data,
      });
    });
  };

  buscarJugadores = (e) => {
    e.preventDefault();
    let idEquipo = this.selectEquipo.current.value;
    let request = "api/jugadores/jugadoresequipos/" + idEquipo;
    let url = this.urlApi + request;
    console.log(idEquipo);
    axios.get(url).then((response) => {
      console.log(response.data);
      this.setState({
        jugadores: response.data,
      });
    });
  };

  loadEquipos = () => {
    var request = "api/Equipos";
    var url = this.urlApi + request;
    axios.get(url).then((response) => {
      console.log(response.data);
      this.setState({
        equipos: response.data,
      });
    });
  };

  componentDidMount = () => {
    this.loadEquipos();
  };

  render() {
    return (
      <div>
        <h1>Mini Práctica React</h1>
        <form>
          <label>Nombre jugador</label>
          <input type="text" ref={this.cajaJugador} />
          <button onClick={this.buscarNombre}>Buscar por Nombre</button>
        </form>
        <hr />
        <form>
          <label>Seleccione un equipo</label>
          <select ref={this.selectEquipo}>
            {this.state.equipos.map((equipo, index) => {
              return (
                <option key={index} value={equipo.idEquipo}>
                  {equipo.nombre}
                </option>
              );
            })}
          </select>
          <button onClick={this.buscarJugadores}>Buscar jugadores</button>
        </form>
        {this.state.jugadores.length > 0 && (
          <table border="1" style={{ marginTop: "20px", width: "50%" }}>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Posición</th>
                <th>País</th>
                <th>Fecha Nacimiento</th>
              </tr>
            </thead>
            <tbody>
              {this.state.jugadores.map((jugador, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={jugador.imagen}
                      alt={jugador.nombre}
                      style={{ width: "150px", height: "150px" }}
                    />
                  </td>
                  <td>{jugador.nombre}</td>
                  <td>{jugador.posicion}</td>
                  <td>{jugador.pais}</td>
                  <td>{jugador.fechaNacimiento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
