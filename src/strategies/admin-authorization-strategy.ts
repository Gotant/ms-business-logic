import {AuthenticationStrategy} from '@loopback/authentication';
import {BindingScope, injectable} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
// TODO?[14]: Importación de paquete.
import fetch from 'node-fetch';
import parserBearerToken from 'parse-bearer-token';
import {GeneralConfig} from '../config/general-conifg';

@injectable({scope: BindingScope.TRANSIENT})
export class AdminAuthorizationStrategy implements AuthenticationStrategy {
  name = 'admin';

  // Le llega la request que es lo que solicita el usuario. En este caso es el token que tiene el rol.
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    //Verifica si tiene un token realmente y si no se rechaza.
    const token = parserBearerToken(request);
    console.log(`Token de la request: ${token}`);
    if (token) {
      // Ahora preguntamos si está correctamente firmado a seguridad.
      // Este fetch se puede guardar en otro sitio.
      const esValido = await fetch(
        `${GeneralConfig.url_ms_seguridad}/${GeneralConfig.metodo_validar_jwt}/${token}`,
      );
      let rolId = await esValido.text();

      console.log('rolId::', rolId);
      //console.log(GeneralConfig.adminRolId)

      if (rolId == GeneralConfig.adminRolId) {
        // validar el id
        let perfil: UserProfile = Object.assign({
          admin: 'OK',
        });
        return perfil;
        // Aunque no sea válido debe retornarse algo.
      } else {
        throw new HttpErrors[401](
          'El token enviado no es válido, se rechaza su solicitud.',
        );
      }
    } else {
      throw new HttpErrors[401](
        'El token es inexistente, Solicitud rechazada.',
      );
    }
  }
}
