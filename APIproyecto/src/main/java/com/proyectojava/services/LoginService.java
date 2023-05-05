package com.proyectojava.services;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	/**
	 * check if the login OK in the database
	 * @param username
	 * @param password
	 * @return true if ok, false else
	 */
	public Integer login(String username, String password) {
		int idUsuario;

		final String sql = "SELECT idusuario FROM usuarios where usuario = ? and passuser = ?;";

		List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, username, password);
		if (!result.isEmpty()) {
			Map<String, Object> firstRow = result.get(0);
			idUsuario = (Integer) firstRow.get("idusuario");
		}
		else {
			idUsuario = -1;
		}

		return idUsuario;
	}

	public int getUserType(int userId) {

		int respuesta = 1;

		final String sql = "SELECT type FROM usuarios where idusuario = ?;";

		List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, userId);
		if (!result.isEmpty()) {
			Map<String, Object> firstRow = result.get(0);
			respuesta = (int) firstRow.get("type");
		}

		return respuesta;
	}

}
