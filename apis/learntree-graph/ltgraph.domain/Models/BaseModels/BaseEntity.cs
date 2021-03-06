using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ltgraph.domain.Models.BaseModels
{
    public class BaseEntity
    {
        public DateTime Created { get; set; }
        public DateTime Updated { get; set; }
        public User? CreatedBy { get; set; }
    }
}