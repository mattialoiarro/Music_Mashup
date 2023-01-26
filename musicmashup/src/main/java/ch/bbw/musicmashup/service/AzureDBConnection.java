package ch.bbw.musicmashup.service;


import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class AzureDBConnection {
    public static void main(String[] args) throws SQLException {
        // Set connection string (change it if we use it)
        String connectionString = "jdbc:sqlserver://mashupdb.database.windows.net:1433;database=mashupdb;user=rra@mashupdb;password={mashupdb123!};encrypt=true;trustServerCertificate=false;hostNameInCertificate=*.database.windows.net;loginTimeout=30;";

        // Create connection
        try (Connection connection = DriverManager.getConnection(connectionString)) {
            System.out.println("Connection to Azure database successful!");
        } catch (Exception e) {
            System.out.println("Error connecting to database: " + e.getMessage());
        }
    }
}