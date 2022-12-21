package ch.bbw.backend.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class AzureDBConnection {
    public static void main(String[] args) throws SQLException {
        //idk if we need this
        // Set connection string (change it if we use it)
        String connectionString = "jdbc:sqlserver://[server name].database.windows.net;database=[database name];user=[username];password=[password]";

        // Create connection
        try (Connection connection = DriverManager.getConnection(connectionString)) {
            System.out.println("Connection to Azure database successful!");
        } catch (Exception e) {
            System.out.println("Error connecting to database: " + e.getMessage());
        }
    }
}



