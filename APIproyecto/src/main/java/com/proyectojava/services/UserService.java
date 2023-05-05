package com.proyectojava.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.proyectojava.model.Producto;
import com.proyectojava.model.Tarea;

@Service
public class UserService {
	@Autowired
	private JdbcTemplate jdbcTemplate;

	public String getUsername(int userId) {

		String respuesta = "invitado";

		final String sql = "SELECT usuario FROM usuarios where idusuario = ?;";

		List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, userId);
		if (!result.isEmpty()) {
			Map<String, Object> firstRow = result.get(0);
			respuesta = (String) firstRow.get("usuario");
		}

		return respuesta;
	}

	/**
	 * get all the works of a user in the database
	 *
	 * @param idUser
	 * @return the list of works
	 */

	public List<Tarea> findWorksForUser(int idUser) {
		final String sql = "select * from tareas where idusuario = ?;";

		List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, idUser);

		List<Tarea> tareas = new ArrayList<>();

		for (Map<String, Object> row : result) {
			Tarea tarea = new Tarea();
			tarea.setIdTarea((int) row.get("idtarea"));
			tarea.setDireccion((String) row.get("direccion"));
			tarea.setIdUsuario((int) row.get("idusuario"));
			tarea.setFinalizada((boolean) row.get("finalizada"));
			tareas.add(tarea);
		}
		return tareas;
	}

	/**
	 * get all the products of a user in a work
	 *
	 * @param idTask
	 * @return the list of products
	 */

	public List<Producto> findProductsByTask(int idTask) {
		final String sql = "select productos.idproducto, productos.nombreProducto \r\n"
				+ "from productos join productostareas on productostareas.idproducto = productos.idproducto\r\n"
				+ "where productostareas.idtarea = ?;";

		List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, idTask);

		List<Producto> productos = new ArrayList<>();

		for (Map<String, Object> row : result) {
			Producto producto = new Producto();
			producto.setIdProducto((int) row.get("idproducto"));
			producto.setNombreProducto((String) row.get("nombreProducto"));
			producto.setDescripcion((String) row.get("descripcion"));
			productos.add(producto);
		}
		return productos;
	}

	public Tarea getTask(int taskId) {

		Tarea tarea = new Tarea();

		final String sql = "SELECT * FROM tareas where idtarea = ?;";

		List<Map<String, Object>> result = jdbcTemplate.queryForList(sql, taskId);
		if (!result.isEmpty()) {
			Map<String, Object> firstRow = result.get(0);
			tarea.setIdTarea((int) firstRow.get("idtarea"));
			tarea.setDireccion((String) firstRow.get("direccion"));
			tarea.setIdUsuario((int) firstRow.get("idusuario"));
			tarea.setFinalizada((boolean) firstRow.get("finalizada"));
		} else {
			tarea = null;
		}

		return tarea;
	}

	public boolean changeTaskState(int taskId) {
		boolean b = false;

		Tarea tarea = getTask(taskId);

		if (tarea != null) {
			boolean input = !tarea.isFinalizada();

			final String sql_delete = "UPDATE tareas SET finalizada = ? WHERE idtarea = ?;";
			int result = jdbcTemplate.update(sql_delete ,input, taskId);

			if (result > 0) {
				b = true;
			} else {
				b = false;
			}
		}

		return b;
	}

}
