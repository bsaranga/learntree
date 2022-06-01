using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace lt_core_api.Migrations
{
    public partial class addedsessionid : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SessionId",
                table: "UserActivity",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SessionId",
                table: "UserActivity");
        }
    }
}
