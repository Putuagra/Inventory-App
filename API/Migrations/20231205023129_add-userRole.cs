using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class adduserRole : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "is_used",
                table: "tb_m_users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "otp",
                table: "tb_m_users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "tb_m_roles",
                columns: table => new
                {
                    guid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_m_roles", x => x.guid);
                });

            migrationBuilder.CreateTable(
                name: "tb_tr_user_roles",
                columns: table => new
                {
                    guid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    user_guid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    role_guid = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    created_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    modified_date = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tb_tr_user_roles", x => x.guid);
                    table.ForeignKey(
                        name: "FK_tb_tr_user_roles_tb_m_roles_role_guid",
                        column: x => x.role_guid,
                        principalTable: "tb_m_roles",
                        principalColumn: "guid",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_tb_tr_user_roles_tb_m_users_user_guid",
                        column: x => x.user_guid,
                        principalTable: "tb_m_users",
                        principalColumn: "guid",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_tb_tr_user_roles_role_guid",
                table: "tb_tr_user_roles",
                column: "role_guid");

            migrationBuilder.CreateIndex(
                name: "IX_tb_tr_user_roles_user_guid",
                table: "tb_tr_user_roles",
                column: "user_guid");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tb_tr_user_roles");

            migrationBuilder.DropTable(
                name: "tb_m_roles");

            migrationBuilder.DropColumn(
                name: "is_used",
                table: "tb_m_users");

            migrationBuilder.DropColumn(
                name: "otp",
                table: "tb_m_users");
        }
    }
}
