package com.proyectojava.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

import com.proyectojava.model.Producto;
import com.proyectojava.model.ProductosTarea;
import com.proyectojava.model.Tarea;
import com.proyectojava.model.Usuario;

@Service
public class AdminService {
	@Autowired
	private JdbcTemplate jdbcTemplate;
	@Autowired
	private TransactionTemplate transactionTemplate;

	public boolean insertTask(ProductosTarea productosTarea) {
		boolean b = true;

		transactionTemplate.execute(new TransactionCallbackWithoutResult() {
			@Override
			protected void doInTransactionWithoutResult(TransactionStatus status) {
				int contador = 0;

				String insertTareaSql = "INSERT INTO tareas (direccion, idusuario) VALUES (?, ?)";
				jdbcTemplate.update(insertTareaSql, productosTarea.getTarea().getDireccion(),
						findUserIdWithFewestTasks(getAllTasks()));

				String lastInsertIdSql = "SELECT LAST_INSERT_ID()";
				int idTarea = jdbcTemplate.queryForObject(lastInsertIdSql, Integer.class);

				String insertProductosTareaSql = "INSERT INTO productostareas (idtarea, idproducto) VALUES (?, ?)";
				for (Producto producto : productosTarea.getProductos()) {
					jdbcTemplate.update(insertProductosTareaSql, idTarea, producto.getIdProducto());
				}
			}
		});

		return b;
	}

	public boolean insertProducts(ProductosTarea productosTarea) {
		boolean b = false;

		final String sql_delete = "DELETE FROM productostareas WHERE idtarea=?;";
		int result = jdbcTemplate.update(sql_delete, productosTarea.getTarea().getIdTarea());
		final String sql_insert_all = "INSERT INTO productostareas (idtarea, idproducto) VALUES (?, ?)";
		int totalFilasAfectadas = 0;
		for (Producto p : productosTarea.getProductos()) {
			int filasAfectadas = jdbcTemplate.update(sql_insert_all, productosTarea.getTarea().getIdTarea(),
					p.getIdProducto());
			totalFilasAfectadas += filasAfectadas;
		}
		if (productosTarea.getProductos().size() == totalFilasAfectadas) {
			b = true;
		} else {
			b = false;
		}

		return b;
	}

	public boolean deleteTask(int idTarea) {
		boolean b = false;

		final String sql = "DELETE FROM tareas WHERE idtarea = ?;";

		int result = jdbcTemplate.update(sql, idTarea);

		if (result == 1) {
			b = true;
		} else {
			b = false;
		}

		return b;
	}

	public List<Usuario> getAllUsers() {
		final String sql = "select * from usuarios;";

		List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);

		List<Usuario> usuarios = new ArrayList<>();

		for (Map<String, Object> row : result) {
			Usuario usuario = new Usuario();
			usuario.setIdUser((int) row.get("idusuario"));
			usuario.setUser((String) row.get("usuario"));
			usuario.setPassword((String) row.get("passuser"));
			usuario.setType((int) row.get("type"));
			usuario.setUserName((String) row.get("nombre_empleado"));
			usuarios.add(usuario);
		}

		return usuarios;
	}

	public List<Producto> getAllProducts() {
		final String sql = "select * from productos;";

		List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);

		List<Producto> productos = new ArrayList<>();

		for (Map<String, Object> row : result) {
			Producto producto = new Producto();
			producto.setIdProducto((int) row.get("idproducto"));
			producto.setNombreProducto((String) row.get("nombreproducto"));
			producto.setDescripcion((String) row.get("descripcion"));
			productos.add(producto);
		}

		return productos;
	}

	public List<Tarea> getAllTasks() {
		final String sql = "select * from tareas;";

		List<Map<String, Object>> result = jdbcTemplate.queryForList(sql);

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

	public int findUserIdWithFewestTasks(List<Tarea> tareas) {
		// Creo un mapa para contar el número de tareas para cada usuario
		Map<Integer, Integer> tareasPorUsuario = new HashMap<>();
		for (Tarea tarea : tareas) {
			int idUsuario = tarea.getIdUsuario();
			tareasPorUsuario.put(idUsuario, tareasPorUsuario.getOrDefault(idUsuario, 0) + 1);
		}

		// Encuentro el número mínimo de tareas y recopilo los IDs de usuario que tienen
		// ese número
		int minTareas = Collections.min(tareasPorUsuario.values());
		List<Integer> usuariosConMinTareas = new ArrayList<>();
		for (Map.Entry<Integer, Integer> entry : tareasPorUsuario.entrySet()) {
			if (entry.getValue() == minTareas) {
				usuariosConMinTareas.add(entry.getKey());
			}
		}

		// Si solo hay un usuario con el número mínimo de tareas, devuelve su ID
		if (usuariosConMinTareas.size() == 1) {
			return usuariosConMinTareas.get(0);
		} else {
			// Si hay varios usuarios con el número mínimo de tareas, elige uno al azar
			Random rand = new Random();
			return usuariosConMinTareas.get(rand.nextInt(usuariosConMinTareas.size()));
		}
	}

}