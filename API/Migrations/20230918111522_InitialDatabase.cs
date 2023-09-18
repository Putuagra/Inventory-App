using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class InitialDatabase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "tb_m_suppliers",
                columns: table => new
                {
                    guid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    address = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    phone_number = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_m_suppliers", x => x.guid);
                });

            migrationBuilder.CreateTable(
                name: "tb_m_users",
                columns: table => new
                {
                    guid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    email = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    password = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_m_users", x => x.guid);
                });

            migrationBuilder.CreateTable(
                name: "tb_m_categories",
                columns: table => new
                {
                    guid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    supplier_guid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_m_categories", x => x.guid);
                    table.ForeignKey(
                        name: "FK_tb_m_categories_tb_m_suppliers_supplier_guid",
                        column: x => x.supplier_guid,
                        principalTable: "tb_m_suppliers",
                        principalColumn: "guid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_m_products",
                columns: table => new
                {
                    guid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    stock = table.Column<int>(type: "int", nullable: false),
                    price = table.Column<int>(type: "int", nullable: false),
                    description = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    category_guid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    supplier_guid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_m_products", x => x.guid);
                    table.ForeignKey(
                        name: "FK_tb_m_products_tb_m_categories_category_guid",
                        column: x => x.category_guid,
                        principalTable: "tb_m_categories",
                        principalColumn: "guid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_m_products_tb_m_suppliers_supplier_guid",
                        column: x => x.supplier_guid,
                        principalTable: "tb_m_suppliers",
                        principalColumn: "guid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "tb_tr_transactions",
                columns: table => new
                {
                    guid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    user_guid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    product_guid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_tr_transactions", x => x.guid);
                    table.ForeignKey(
                        name: "FK_tb_tr_transactions_tb_m_products_product_guid",
                        column: x => x.product_guid,
                        principalTable: "tb_m_products",
                        principalColumn: "guid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_tr_transactions_tb_m_users_user_guid",
                        column: x => x.user_guid,
                        principalTable: "tb_m_users",
                        principalColumn: "guid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tb_m_categories_supplier_guid",
                table: "tb_m_categories",
                column: "supplier_guid");

            migrationBuilder.CreateIndex(
                name: "IX_tb_m_products_category_guid",
                table: "tb_m_products",
                column: "category_guid");

            migrationBuilder.CreateIndex(
                name: "IX_tb_m_products_supplier_guid",
                table: "tb_m_products",
                column: "supplier_guid");

            migrationBuilder.CreateIndex(
                name: "IX_tb_m_suppliers_email_phone_number",
                table: "tb_m_suppliers",
                columns: new[] { "email", "phone_number" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_tb_m_users_email",
                table: "tb_m_users",
                column: "email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_tb_tr_transactions_product_guid",
                table: "tb_tr_transactions",
                column: "product_guid");

            migrationBuilder.CreateIndex(
                name: "IX_tb_tr_transactions_user_guid",
                table: "tb_tr_transactions",
                column: "user_guid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tb_tr_transactions");

            migrationBuilder.DropTable(
                name: "tb_m_products");

            migrationBuilder.DropTable(
                name: "tb_m_users");

            migrationBuilder.DropTable(
                name: "tb_m_categories");

            migrationBuilder.DropTable(
                name: "tb_m_suppliers");
        }
    }
}
