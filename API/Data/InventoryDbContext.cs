using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class InventoryDbContext : DbContext
{
    public InventoryDbContext(DbContextOptions<InventoryDbContext> options) : base(options) { }

    // Tables
    public DbSet<Account> Accounts { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Transaction> Transactions { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<AccountRole> AccountRoles { get; set; }

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

        // Account -> AccountRole
        modelBuilder.Entity<Account>()
            .HasMany(account => account.AccountRoles)
            .WithOne(accountRole => accountRole.Account)
            .HasForeignKey(accountRole => accountRole.AccountGuid);

        // Account - User
        modelBuilder.Entity<Account>()
            .HasOne(account => account.User)
            .WithOne(user => user.Account)
            .HasForeignKey<Account>(account => account.Guid);

        // Role -> UserRole
        modelBuilder.Entity<Role>()
            .HasMany(role => role.AccountRoles)
            .WithOne(accountRole => accountRole.Role)
            .HasForeignKey(accountRole => accountRole.RoleGuid);

        // Supplier - Product
        modelBuilder.Entity<Supplier>()
            .HasMany(supplier => supplier.Products)
            .WithOne(product => product.Supplier)
            .HasForeignKey(product => product.SupplierGuid);

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
        modelBuilder.Entity<Category>()
            .HasMany(category => category.Products)
            .WithOne(product => product.Category)
            .HasForeignKey(product => product.CategoryGuid);
    }
}
