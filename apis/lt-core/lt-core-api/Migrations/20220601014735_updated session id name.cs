using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace lt_core_api.Migrations
{
    public partial class updatedsessionidname : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SessionId",
                table: "UserActivity",
                newName: "LastActiveSessionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastActiveSessionId",
                table: "UserActivity",
                newName: "SessionId");
        }
    }
}
