using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace lt_core_api.Migrations
{
    public partial class addedsubtitletolearningpathmetadata : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SubTitle",
                table: "LearningPathMetaData",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SubTitle",
                table: "LearningPathMetaData");
        }
    }
}
