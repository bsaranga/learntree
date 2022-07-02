using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace lt_core_api.Migrations
{
    public partial class Addedupvotesdownvotesandcommentcount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CommentCount",
                table: "LearningPathMetaData",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DownVotes",
                table: "LearningPathMetaData",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UpVotes",
                table: "LearningPathMetaData",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CommentCount",
                table: "LearningPathMetaData");

            migrationBuilder.DropColumn(
                name: "DownVotes",
                table: "LearningPathMetaData");

            migrationBuilder.DropColumn(
                name: "UpVotes",
                table: "LearningPathMetaData");
        }
    }
}
