import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ChevronUp, ChevronDown, Eye, EyeOff } from 'lucide-react';

interface Section {
  id: string;
  label: string;
  visible: boolean;
}

interface SectionReorderingProps {
  sections: Section[];
  onChange: (sections: Section[]) => void;
}

export const SectionReordering: React.FC<SectionReorderingProps> = ({
  sections,
  onChange,
}) => {
  const [items, setItems] = useState(sections);

  const moveUp = (index: number) => {
    if (index <= 0) return;
    const newItems = [...items];
    [newItems[index - 1], newItems[index]] = [newItems[index], newItems[index - 1]];
    setItems(newItems);
    onChange(newItems);
  };

  const moveDown = (index: number) => {
    if (index >= items.length - 1) return;
    const newItems = [...items];
    [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
    setItems(newItems);
    onChange(newItems);
  };

  const toggleVisibility = (index: number) => {
    const newItems = [...items];
    newItems[index].visible = !newItems[index].visible;
    setItems(newItems);
    onChange(newItems);
  };

  return (
    <div className="space-y-3">
      <Label>Section Order & Visibility</Label>
      <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
        {items.map((section, index) => (
          <Card key={section.id} className="overflow-hidden">
            <CardContent className="p-3 flex items-center justify-between">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="flex flex-col gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="h-6 w-6 p-0"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveDown(index)}
                    disabled={index === items.length - 1}
                    className="h-6 w-6 p-0"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{section.label}</p>
                  <p className="text-xs text-muted-foreground">
                    Position: {index + 1} of {items.length}
                  </p>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleVisibility(index)}
                className="ml-2"
              >
                {section.visible ? (
                  <Eye className="w-4 h-4" />
                ) : (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        Use arrows to reorder. Click eye icon to show/hide sections.
      </p>
    </div>
  );
};
