using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class InventoryDbContext : DbContext
{
    public InventoryDbContext(DbContextOptions<InventoryDbContext> options) : base(options) { }



    // Tables
    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Transaction> Transactions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Contraints Unique
        modelBuilder.Entity<User>()
            .HasIndex(u => new
            {
                u.Email
            }).IsUnique();

        modelBuilder.Entity<Supplier>()
            .HasIndex(s => new
            {
                s.Email,
                s.PhoneNumber
            }).IsUnique();


        // Relation
        // User -> Transaction
        modelBuilder.Entity<User>()
            .HasMany(user => user.Transactions)
            .WithOne(transaction => transaction.User)
            .HasForeignKey(transaction => transaction.UserGuid);

        // Supplier - Product
        modelBuilder.Entity<Supplier>()
            .HasMany(supplier => supplier.Products)
            .WithOne(product => product.Supplier)
            .HasForeignKey(product => product.SupplierGuid)
            .OnDelete(DeleteBehavior.NoAction);

        // Supplier - Category
        modelBuilder.Entity<Supplier>()
            .HasMany(supplier => supplier.Categories)
            .WithOne(category => category.Supplier)
            .HasForeignKey(category => category.SupplierGuid);

        // Product - Transacation
        modelBuilder.Entity<Product>()
            .HasMany(product => product.Transactions)
            .WithOne(transaction => transaction.Product)
            .HasForeignKey(transaction => transaction.ProductGuid);

        // Product - Category
        modelBuilder.Entity<Product>()
            .HasOne(product => product.Category)
            .WithMany(category => category.Products)
            .HasForeignKey(product => product.CategoryGuid);
    }
}
